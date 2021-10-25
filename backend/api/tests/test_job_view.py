import json
import random
from string import ascii_letters, digits

from .custom_fixtures import *


@pytest.mark.parametrize('users, status_codes', [
    # status_codes indexes:
    #               0 : api/jobs GET (job-list view)
    #               1 : api/jobs POST (job-list view / job creation being the company owner)
    #               2 : api/jobs POST(job-list view / job creation without being the company owner)
    #               3 : api/jobs/1 GET (job-detail view)
    #               4 : api/jobs/1 PATCH (job-detail view / edit without being the job owner)
    #               5 : api/jobs/{x} PATCH (job-detail view / edit with being the job owner)
    ("create_users_admins", [200, 201, 201, 200, 200, 200]),
    ("create_users_companies", [200, 201, 403, 200, 403, 200]),
    ("create_users_students", [200, None, 403, 200, 403, 403]),
    ("create_users_anons", [401, 401, 401, 401, 401, 401])
])
@pytest.mark.db
def test_permissions(client, users, status_codes, request, django_user_model, create_jobs):
    users = request.getfixturevalue(users)
    companies = create_jobs['companies']['admins'] + create_jobs['companies']['companies']
    jobs = create_jobs['jobs']['admins'] + create_jobs['jobs']['companies']

    for user in users:
        # get the access tokens for the 3 user types, give a wrong token to the anon user
        if user.user_type is not None:
            # Check the jwt retrieval with correct credentials
            response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                                   content_type="application/json")
            assert response.status_code == 200

            # Save the access token
            access_token = response.json()['access']
        else:
            access_token = ''.join(random.choices(ascii_letters + digits, k=30))

        # Check the GET on job-list with given token
        response = client.get('/api/jobs/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[0]

        if user.user_type in (1, 2):
            # Check for POSTing a new job on job-list being the owner (except for students)
            # First create a company under the user
            rd_name = ''.join(random.choices(ascii_letters, k=10))
            response = client.post('/api/companies/',
                                   {'name': rd_name},
                                   HTTP_AUTHORIZATION=f'Bearer {access_token}')
            company_url = json.loads(response.content)['url']
            # Then create a job under the company
            response = client.post('/api/jobs/',
                                   {'name': f'{user.first_name} job',
                                    'owner': company_url,
                                    'city': 'New York',
                                    'country': 'USA',
                                    'hours_per_week': 40},
                                   HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == status_codes[1]

        # Check for POSTing a new job on job-list without being the owner
        response = client.get('/api/companies/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = client.post('/api/jobs/',
                               {'name': f'{repr(user)} job',
                                'owner': f'http://testserver/api/companies/{companies[0].id}/',
                                'city': 'New York',
                                'country': 'USA',
                                'hours_per_week': 40},
                               HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[2]

        # Check the GET on job-detail
        response = client.get(f'/api/jobs/{jobs[0].id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[3]

        # Check the PATCH on job-detail without being owner
        response = client.patch(f'/api/jobs/{jobs[0].id}/', {'city': 'a changed city'}, HTTP_AUTHORIZATION=f'Bearer {access_token}',
                                content_type='application/json')
        assert response.status_code == status_codes[4]

        # Check the PATCH on job-detail being the owner (no companies for student users though)
        if user.user_type in (1, 2):
            # to get the job id of the posted job previously, we get the first company of the user, and of that, the first job.
            job_id = user.companies.first().jobs.first().id
            response = client.patch(f'/api/jobs/{job_id}/', {'city': 'a changed city'},
                                    HTTP_AUTHORIZATION=f'Bearer {access_token}', content_type='application/json')
            assert response.status_code == status_codes[5]


@pytest.mark.parametrize('field, value', [
    ('url', 'http://testserver/api/jobs/{id}/'),
    ('name', ''),
    ('owner', 'http://testserver/api/companies/{id}/'),
    ('city', ''),
    ('country', ''),
    ('hours_per_week', ''),
    ('salary_per_month', ''),
    ('publish_date', ''),
    ('description', '')
])
@pytest.mark.django_db
def test_fields(client, field, value, create_users_admins, create_users_companies, create_jobs):
    users = create_jobs['users']['admins'] + create_jobs['users']['companies']
    jobs = create_jobs['jobs']['admins'] + create_jobs['jobs']['companies']
    for user in users:
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # save the token
        access_token = response.json()['access']

        # check the company endpoint of each created admin company
        for job in jobs:
            response = client.get(f'/api/jobs/{job.id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == 200
            assert field in response.json()
            if field == 'url':
                assert response.json()['url'] == value.format(id=job.id)
            elif field == 'owner':
                assert response.json()['owner'] == value.format(id=job.owner.id)
            elif field == 'publish_date':
                assert response.json()['publish_date'] == getattr(job, 'publish_date').strftime("%Y-%m-%d")
            elif field == 'hours_per_week':
                assert float(response.json()['hours_per_week']) == float(getattr(job, field))
            else:
                assert response.json()[field] == getattr(job, field)
