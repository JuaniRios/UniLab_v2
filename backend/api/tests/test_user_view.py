import random
from string import ascii_lowercase, digits, ascii_letters

from .custom_fixtures import *


@pytest.mark.parametrize(
    'users, status_codes', [
        # status_codes indexes:
        #               0 : incorrect credentials on api/token POST
        #               1 : correct credentials on prev idx
        #               2 : correct credentials on api/users GET (user-list view)
        #               3 : incorrect credentials on prev idx
        #               4 : correct credentials on api/users/1 GET (user-detail view)
        #               5 : incorrect credentials on prev idx
        #               6 : correct credentials on api/users POST (user-list view / user creation)
        #               7 : incorrect credentials on prev idx
        ("create_users_admins", [401, 200, 200, 401, 200, 401, 201, 401]),
        ("create_users_companies", [401, 200, 200, 401, 200, 401, 403, 401]),
        ("create_users_students", [401, 200, 200, 401, 200, 401, 403, 401]),
    ]
)
@pytest.mark.django_db
def test_permissions(client, users, status_codes, request):
    users = request.getfixturevalue(users)
    for user in users:
        # Check with incorrect credentials (password)
        response = client.post('/api/token/', {'email': user.email, 'password': '4321'},
                               content_type="application/json")
        assert response.status_code == status_codes[0]

        # Check the jwt retrieval with correct credentials
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == status_codes[1]

        # Save the access token
        access_token = response.json()['access']
        wrong_token = ''.join(random.choices(ascii_letters + digits, k=30))

        # Check the GET on user-list with given token
        response = client.get('/api/users/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[2]

        # Check with incorrect token (i.e without authentication)
        response = client.get('/api/users/', HTTP_AUTHORIZATION=wrong_token)
        assert response.status_code == status_codes[3]

        # Check the GET on user-detail with given token
        response = client.get('/api/users/1/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[4]

        # Check with incorrect token (i.e without authorization)
        response = client.get('/api/users/1/', HTTP_AUTHORIZATION=wrong_token)
        assert response.status_code == status_codes[5]

        # Check for POSTing new users on user-list (an admin, a company, and a student)
        for user_type in [1, 2, 3]:
            rd_name = ''.join(random.choices(ascii_lowercase + digits, k=10))
            response = client.post('/api/users/',
                                   {'email': f'{rd_name}@gmail.com', 'password': '1234', 'first_name': 'John',
                                    'last_name': 'Doe', 'user_type': f'{user_type}'},
                                   HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == status_codes[6]

        # Check unauthenticated POSTing of new users on user-list (incorrect token)
        for user_type in [1, 2, 3]:
            rd_name = ''.join(random.choices(ascii_lowercase + digits, k=10))
            response = client.post('/api/users/',
                                   {'email': f'{rd_name}@gmail.com', 'password': '1234', 'first_name': 'John',
                                    'last_name': 'Doe', 'user_type': f'{user_type}'},
                                   HTTP_AUTHORIZATION=f'Bearer {wrong_token}')
            assert response.status_code == status_codes[7]

        # Check PATCH


@pytest.mark.parametrize('field, value', [
    ('url', 'http://testserver/api/users/{id}/'),
    ('email', ''),
    ('first_name', ''),
    ('last_name', ''),
    ('user_type', ''),
    ('companies', ''),
    ('image', '')
])
@pytest.mark.django_db
def test_fields(client, field, value, create_users_admins):
    admin_count = len(create_users_admins)
    for admin in create_users_admins:
        # get the token
        response = client.post('/api/token/', {'email': admin.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # save the token
        access_token = response.json()['access']

        # check the user endpoint of each created admin
        for i in range(admin_count):
            response = client.get(f'/api/users/{i + 1}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == 200
            assert field in response.json()
            if field == 'url':
                assert response.json()[field] == value.format(id=i + 1)
            elif field == 'companies':
                assert response.json()[field] == list(getattr(create_users_admins[i], field).all())
            elif field == 'image':
                assert response.json()['image'] == f"http://testserver{getattr(create_users_admins[i], 'image').url}"
            else:
                assert response.json()[field] == getattr(create_users_admins[i], field)
