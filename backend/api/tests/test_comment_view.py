import random
from string import ascii_letters, digits
from itertools import chain
from .custom_fixtures import *


@pytest.mark.parametrize('users, status_codes', [
    # status_codes indexes:
    #               0 : api/comments GET comment-list view
    #               1 : api/comments POST comment-list view
    #               2 : api/comments/1 GET comment-detail view
    #               3 : api/comments/1 PATCH comment-detail view / edit without being the comment owner
    #               4 : api/comments/{x} PATCH comment-detail view / edit with being the post owner (except for anon)
    ("create_users_admins", [200, 201, 200, 200, 200]),
    ("create_users_companies", [200, 201, 200, 403, 200]),
    ("create_users_students", [200, 201, 200, 403, 200]),
    ("create_users_anons", [401, 401, 401, 401, 401])
])
@pytest.mark.db
def test_permissions(client, users, status_codes, request, create_comments, django_user_model):
    users = request.getfixturevalue(users)
    posts = [x for x in chain.from_iterable(create_comments['posts'].values())]
    comments = [x for x in chain.from_iterable(create_comments['comments'].values())]

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

        # Check the GET on comment-list with given token
        response = client.get('/api/comments/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[0]

        # Check for POSTing a new comment on comment-list
        response = client.post('/api/comments/',
                               {'content': f'{user.first_name} comment',
                                'owner': f'http://testserver/api/users/{user.id}/',
                                'post': f'http://testserver/api/posts/{random.choice(posts).id}/'},
                               HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[1]

        # used later for checking PATCH
        comment_url = response.json()['url'] if user.user_type is not None else f'/api/comments/{random.choice(comments).id}/'

        # Check the GET on comment-detail
        response = client.get(f'/api/comments/{random.choice(comments).id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        assert response.status_code == status_codes[2]

        # Check the PATCH on comment-detail without being owner
        response = client.patch(f"http://testserver/api/comments/{comments[0].id}/", {'content': 'a changed content'},
                                HTTP_AUTHORIZATION=f'Bearer {access_token}',
                                content_type='application/json')
        assert response.status_code == status_codes[3]

        # Check the PATCH on post-detail being the owner
        response = client.patch(comment_url, {'title': 'a changed title'},
                                HTTP_AUTHORIZATION=f'Bearer {access_token}', content_type='application/json')
        assert response.status_code == status_codes[4]


@pytest.mark.parametrize('users', ['create_users_admins', 'create_users_companies', 'create_users_students'])
@pytest.mark.django_db
def test_fields(client, request, users, create_comments):
    users = request.getfixturevalue(users)
    comments = [x for x in chain.from_iterable(create_comments['comments'].values())]
    fields = ['url', 'content', 'owner', 'post', 'publish_date']
    for user in users:
        response = client.post('/api/token/', {'email': user.email, 'password': '1234'},
                               content_type="application/json")
        assert response.status_code == 200

        # save the token
        access_token = response.json()['access']

        # check the post endpoint of each created comment
        for comment in comments:
            response = client.get(f'/api/comments/{comment.id}/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
            assert response.status_code == 200
            for field in fields:
                if field == 'url':
                    assert response.json()['url'] == f'http://testserver/api/comments/{comment.id}/'
                elif field == 'owner':
                    assert response.json()['owner'] == f'http://testserver/api/users/{comment.owner.id}/'
                elif field == 'publish_date':
                    assert response.json()['publish_date'] == comment.publish_date.strftime("%Y-%m-%d")
                elif field == 'post':
                    assert response.json()['post'] == f'http://testserver/api/posts/{comment.post.id}/'
                else:
                    assert response.json()[field] == getattr(comment, field)
