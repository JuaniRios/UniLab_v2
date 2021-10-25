import random
from string import ascii_letters, digits
from time import strftime

from .custom_fixtures import *


@pytest.mark.parametrize(
    'users, status_codes', [
        # status_codes indexes:
        #               0 : correct credentials on api/companies GET (company-list view)
        #               1 : with incorrect credentials
        #               2 : correct credentials on api/companies/1 GET (company-detail view)
        #               3 : with incorrect credentials
        #               4 : correct credentials on api/companies POST (company-list view / company creation)
        #               5 : with incorrect credentials
        #               6 : correct credentials on api/companies/1 PATCH (company-detail view / edit without being owner)
        #               7 : with incorrect credentials
        #               8 : correct credentials on api/companies/{x} PATCH (company-detail view / edit with being the owner)
        #               9 : with incorrect credentials
        ("create_users_admins", [200, 401, 201, 401, 200, 401, 200, 401, 200, 401]),
        ("create_users_companies", [200, 401, 201, 401, 200, 401, 403, 401, 200, 401]),
        ("create_users_students", [200, 401, 403, 401, 200, 401, 403, 401, 200, 401]),
    ])
@pytest.mark.django_db
def test_permissions(client, users, status_codes, request, create_companies, django_user_model):
    users = request.getfixturevalue(users)
    for user in users:
        # Check the jwt retrieval with correct credentials
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # Save the access token
        access_token = response.json()['access']
        wrong_token = ''.join(random.choices(ascii_letters + digits, k=30))

        # Check the GET on company-list with given token
        response = client.get('/api/companies/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[0]

        # Check with incorrect credentials
        response = client.get('/api/companies/', HTTP_AUTHORIZATION=f'Bearer {wrong_token}')
        assert response.status_code == status_codes[1]

        # Check for POSTing a new company on company-list
        rd_name = ''.join(random.choices(ascii_letters, k=10))
        response = client.post('/api/companies/',
                               {'name': rd_name},
                               HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[2]

        # Check with incorrect credentials
        rd_name = ''.join(random.choices(ascii_letters, k=10))
        response = client.post('/api/companies/',
                               {'name': rd_name},
                               HTTP_AUTHORIZATION=f'Bearer {wrong_token}')
        assert response.status_code == status_codes[3]

        # Check the GET on company-detail
        response = client.get('/api/companies/1/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[4]

        # Check with incorrect credentials
        response = client.get('/api/companies/1/', HTTP_AUTHORIZATION=f'Bearer {wrong_token}')
        assert response.status_code == status_codes[5]

        # Check the PATCH on company-detail without being owner
        response = client.patch('/api/companies/1/', {'description': 'a changed description'}, HTTP_AUTHORIZATION=f'Bearer {access_token}',
                                content_type='application/json')
        assert response.status_code == status_codes[6]

        # Check with incorrect credentials
        response = client.patch('/api/companies/1/', {'description': 'a changed description'}, HTTP_AUTHORIZATION=f'Bearer {wrong_token}',
                                content_type='application/json')
        assert response.status_code == status_codes[7]

        # Check the PATCH on company-detail being the owner (no companies for student users though)
        if user.user_type != 3:
            company_id = user.companies.first().id
            response = client.patch(f'/api/companies/{company_id}/', {'description': 'a changed description'},
                                    HTTP_AUTHORIZATION=f'Bearer {access_token}', content_type='application/json')
            assert response.status_code == status_codes[8]

            # Check with incorrect credentials
            company_id = user.companies.first().id
            response = client.patch(f'/api/companies/{company_id}/', {'description': 'a changed description'},
                                    HTTP_AUTHORIZATION=f'Bearer {wrong_token}', content_type='application/json')
            assert response.status_code == status_codes[9]


@pytest.mark.parametrize('field, value', [
    ('url', 'http://testserver/api/companies/{id}/'),
    ('name', ''),
    ('owner', 'http://testserver/api/users/{id}/'),
    ('publish_date', ''),
    ('description', ''),
    ('video_url', ''),
    ('website_url', ''),
    ('rating', '')
])
@pytest.mark.django_db
def test_fields(client, field, value, create_companies):
    users = create_companies['users']['admins'] + create_companies['users']['companies']
    for user in users:
        # get the token
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # save the token
        access_token = response.json()['access']

        # check the company endpoint of each created company
        # First loop through the 3 types (admin, company, student)
        for company_type in create_companies['companies']:
            # Then loop through the list of companies in each type
            for company in create_companies['companies'][company_type]:
                response = client.get(f'/api/companies/{company.id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
                assert response.status_code == 200
                assert field in response.json()
                if field == 'url':
                    assert response.json()['url'] == value.format(id=company.id)
                elif field == 'owner':
                    assert response.json()['owner'] == value.format(id=company.owner.id)
                elif field == 'publish_date':
                    assert response.json()['publish_date'] == getattr(company, 'publish_date').strftime("%Y-%m-%d")
                else:
                    assert response.json()[field] == getattr(company, field)
