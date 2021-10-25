import random
from string import ascii_letters, digits

from .custom_fixtures import *


@pytest.mark.parametrize('users, status_codes', [
    # status_codes indexes:
    #               0 : api/posts GET post-list view
    #               1 : api/posts POST post-list view
    #               2 : api/posts/1 GET post-detail view
    #               3 : api/posts/1 PATCH post-detail view / edit without being the post owner
    #               4 : api/posts/{x} PATCH post-detail view / edit with being the post owner (except for anon)
    ("create_users_admins", [200, 201, 200, 200, 200]),
    ("create_users_companies", [200, 201, 200, 403, 200]),
    ("create_users_students", [200, 201, 200, 403, 200]),
    ("create_users_anons", [401, 401, 401, 401, 401])
])
@pytest.mark.db
def test_permissions(client, users, status_codes, request, create_posts, django_user_model):
    users = request.getfixturevalue(users)
    posts = create_posts['posts']
    posts = posts['admins'] + posts['companies'] + posts['students']

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

        # Check the GET on post-list with given token
        response = client.get('/api/posts/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[0]

        # Check for POSTing a new post on post-list
        response = client.post('/api/posts/',
                               {'title': f'{user.first_name} post',
                                'owner': f'http://testserver/api/users/{user.id}',
                                'content': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                           'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et '
                                           'justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem '
                                           'ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy '
                                           'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos '
                                           'et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus '
                                           'est Lorem ipsum dolor sit amet.'},
                               HTTP_AUTHORIZATION=f'Bearer {access_token}')

        assert response.status_code == status_codes[1]
        # used later for checking PATCH
        post_url = response.json()['url'] if user.user_type is not None else f'/api/posts/{posts[3].id}/'

        # Check the GET on post-detail
        response = client.get(f'/api/posts/{posts[0].id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[2]

        # Check the PATCH on post-detail without being owner
        response = client.patch(f'/api/posts/{posts[0].id}/', {'title': 'a changed title'},
                                HTTP_AUTHORIZATION=f'Bearer {access_token}',
                                content_type='application/json')
        assert response.status_code == status_codes[3]

        # Check the PATCH on post-detail being the owner
        response = client.patch(post_url, {'title': 'a changed title'},
                                HTTP_AUTHORIZATION=f'Bearer {access_token}', content_type='application/json')
        assert response.status_code == status_codes[4]



@pytest.mark.parametrize('field, value', [
    ('url', 'http://testserver/api/posts/{id}/'),
    ('title', ''),
    ('content', ''),
    ('rating', ''),
    ('image', ''),
    ('owner', 'http://testserver/api/users/{id}/'),
    ('publish_date', '')
])
@pytest.mark.parametrize('users', ['create_users_admins', 'create_users_companies', 'create_users_students'])
@pytest.mark.django_db
def test_fields(client, request, field, value, users, create_posts):
    users = request.getfixturevalue(users)
    posts = create_posts['posts']
    posts = posts['admins'] + posts['companies'] + posts['students']

    for user in users:
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # save the token
        access_token = response.json()['access']

        # check the post endpoint of each created post
        for post in posts:
            response = client.get(f'/api/posts/{post.id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == 200
            assert field in response.json()
            if field == 'url':
                assert response.json()['url'] == value.format(id=post.id)
            elif field == 'owner':
                assert response.json()['owner'] == value.format(id=post.owner.id)
            elif field == 'publish_date':
                assert response.json()['publish_date'] == getattr(post, 'publish_date').strftime("%Y-%m-%d")
            elif field == 'image':
                assert response.json()['image'] == f"http://testserver{getattr(post, 'image').url}"
            else:
                assert response.json()[field] == getattr(post, field)
