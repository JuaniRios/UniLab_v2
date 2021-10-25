from pathlib import Path

import pytest
from django.contrib.auth.models import AnonymousUser

from ..models import Company, Job, Post, Comment


@pytest.fixture
def create_users_students(db, django_user_model):
    student1 = django_user_model.objects.create_user(email='student1@gmail.com',
                                                     password='1234',
                                                     first_name='student',
                                                     last_name='one',
                                                     user_type=3)
    student2 = django_user_model.objects.create_user(email='student2@gmail.com',
                                                     password='1234',
                                                     first_name='student',
                                                     last_name='two',
                                                     user_type=3)
    student3 = django_user_model.objects.create_user(email='student3@gmail.com',
                                                     password='1234',
                                                     first_name='student',
                                                     last_name='three',
                                                     user_type=3)
    return student1, student2, student3


@pytest.fixture
def create_users_companies(db, django_user_model):
    company1 = django_user_model.objects.create_user(email='company1@gmail.com',
                                                     password='1234',
                                                     first_name='company',
                                                     last_name='one',
                                                     user_type=2)
    company2 = django_user_model.objects.create_user(email='company2@gmail.com',
                                                     password='1234',
                                                     first_name='company',
                                                     last_name='two',
                                                     user_type=2)
    company3 = django_user_model.objects.create_user(email='company3@gmail.com',
                                                     password='1234',
                                                     first_name='company',
                                                     last_name='three',
                                                     user_type=2)
    return company1, company2, company3


@pytest.fixture
def create_users_admins(db, django_user_model):
    admin1 = django_user_model.objects.create_user(email='admin1@gmail.com',
                                                   password='1234',
                                                   first_name='admin',
                                                   last_name='one',
                                                   user_type=1)
    admin2 = django_user_model.objects.create_user(email='admin2@gmail.com',
                                                   password='1234',
                                                   first_name='admin',
                                                   last_name='two',
                                                   user_type=1)
    admin3 = django_user_model.objects.create_user(email='admin3@gmail.com',
                                                   password='1234',
                                                   first_name='admin',
                                                   last_name='three',
                                                   user_type=1)
    return admin1, admin2, admin3


@pytest.fixture
def create_users_anons(db, django_user_model):
    anon1 = AnonymousUser()
    anon1.email = "random@gmail.com"
    anon1.first_name = 'Anon1'
    anon1.last_name = 'ymous'
    anon1.user_type = None

    anon2 = AnonymousUser()
    anon2.email = "R4N40M@hotmail.com"
    anon2.first_name = 'Anon2'
    anon2.last_name = 'ymous'
    anon2.user_type = None

    anon3 = AnonymousUser()
    anon3.email = "d23th.523@yahoo.com"
    anon3.first_name = 'Anon3'
    anon3.last_name = 'ymous'
    anon3.user_type = None

    return anon1, anon2, anon3


@pytest.fixture
def create_companies(db, create_users_admins, create_users_companies):
    admin_company1 = Company.objects.create(name='Admin Comp 1',
                                            description='The company of an admin',
                                            video_url='https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
                                            website_url='https://www.youtube.com',
                                            owner=create_users_admins[0])

    admin_company2 = Company.objects.create(name='Admin Comp 2',
                                            description='The company of an admin',
                                            video_url='https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
                                            website_url='https://www.youtube.com',
                                            owner=create_users_admins[1])

    admin_company3 = Company.objects.create(name='Admin Comp 3',
                                            description='The company of an admin',
                                            video_url='https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
                                            website_url='https://www.youtube.com',
                                            owner=create_users_admins[2])

    company_company1 = Company.objects.create(name='Company Comp 1',
                                              description='The company of a company',
                                              video_url='https://www.youtube.com/watch?v=Boj9eD0Wug8&ab_channel=YuvalNoahHarari',
                                              website_url='https://www.django-rest-framework.org/api-guide/relations/',
                                              owner=create_users_companies[0])

    company_company2 = Company.objects.create(name='Company Comp 2',
                                              description='The company of a company',
                                              video_url='https://www.youtube.com/watch?v=Boj9eD0Wug8&ab_channel=YuvalNoahHarari',
                                              website_url='https://www.django-rest-framework.org/api-guide/relations/',
                                              owner=create_users_companies[1])

    company_company3 = Company.objects.create(name='Company Comp 3',
                                              description='The company of a company',
                                              video_url='https://www.youtube.com/watch?v=Boj9eD0Wug8&ab_channel=YuvalNoahHarari',
                                              website_url='https://www.django-rest-framework.org/api-guide/relations/',
                                              owner=create_users_companies[2])

    return {'companies': {'admins': [admin_company1, admin_company2, admin_company3], 'companies': [company_company1, company_company2,
                                                                                                    company_company3]},
            'users': {'admins': create_users_admins, 'companies': create_users_companies}}


@pytest.fixture
def create_jobs(db, create_companies):
    admin_job1 = Job.objects.create(name='Programmer',
                                    owner=create_companies['companies']['admins'][0],
                                    city='Krems',
                                    country='Austria',
                                    hours_per_week=40,
                                    salary_per_month=2000,
                                    description='Programmer needed asap')

    admin_job2 = Job.objects.create(name='Data Scientist',
                                    owner=create_companies['companies']['admins'][1],
                                    city='Vienna',
                                    country='Austria',
                                    hours_per_week=10,
                                    salary_per_month=700,
                                    description='please come with us')

    admin_job3 = Job.objects.create(name='Marketing Manager',
                                    owner=create_companies['companies']['admins'][2],
                                    city='Munich',
                                    country='Germany',
                                    hours_per_week=30,
                                    salary_per_month=4000,
                                    description='200 new positions ready for you ;)')

    company_job1 = Job.objects.create(name='Programmer',
                                      owner=create_companies['companies']['companies'][0],
                                      city='Luxembourg',
                                      country='Luxembourg',
                                      hours_per_week=35,
                                      salary_per_month=1500,
                                      description='get ready to have fun')

    company_job2 = Job.objects.create(name='Blockchain Engineer',
                                      owner=create_companies['companies']['companies'][1],
                                      city='Zurich',
                                      country='Switzerland',
                                      hours_per_week=45,
                                      salary_per_month=8000,
                                      description='dwjaiodwnae2e')

    company_job3 = Job.objects.create(name='Project Lead',
                                      owner=create_companies['companies']['companies'][2],
                                      city='Valencia',
                                      country='Spain',
                                      hours_per_week=40,
                                      salary_per_month=800,
                                      description='Looking for an experienced leader')

    return {'jobs': {'admins': [admin_job1, admin_job2, admin_job3], 'companies': [company_job1, company_job2, company_job3]},
            'companies': create_companies['companies'],
            'users': create_companies['users']}


@pytest.fixture
def create_posts(db, django_user_model, create_users_admins, create_users_companies, create_users_students):
    admin_post1 = Post.objects.create(title='admin title 1',
                                      content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
                                              'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                      owner=create_users_admins[0],
                                      image=str(Path('../media/img1.jpg')))
    admin_post2 = Post.objects.create(title='admin title 2',
                                      content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                              'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                      owner=create_users_admins[1],
                                      image=str(Path('../media/img2.jpg')))
    admin_post3 = Post.objects.create(title='admin title 3',
                                      content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                              'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                      owner=create_users_admins[2],
                                      image=str(Path('../media/img2.jpg')))

    company_post1 = Post.objects.create(title='company title 1',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_companies[0],
                                        image=str(Path('../media/img3.jpg')))
    company_post2 = Post.objects.create(title='company title 2',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_companies[1],
                                        image=str(Path('../media/img4.jpg')))
    company_post3 = Post.objects.create(title='company title 3',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_companies[2],
                                        image=str(Path('../media/img4.jpg')))

    student_post1 = Post.objects.create(title='student title 1',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_students[0],
                                        image=str(Path('../media/img5.jpg')))
    student_post2 = Post.objects.create(title='student title 2',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_students[1],
                                        image=str(Path('../media/img6.jpg')))
    student_post3 = Post.objects.create(title='student title 2',
                                        content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor '
                                                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
                                        owner=create_users_students[2],
                                        image=str(Path('../media/img6.jpg')))

    return {'posts': {'admins': [admin_post1, admin_post2, admin_post3],
                      'companies': [company_post1, company_post2, company_post3],
                      'students': [student_post1, student_post2, student_post3]},

            'users': {'admins': create_users_admins, 'companies': create_users_companies, 'students': create_users_students}}


@pytest.fixture
def create_comments(db, django_user_model, create_posts):
    posts = create_posts['posts']
    users = create_posts['users']

    ##############
    # Admin Posts:

    # - Self commenting
    admin1_on_admin1_comment = Comment.objects.create(content="I'm admin1, and I comment on my own post",
                                                      owner=users['admins'][0],
                                                      post=posts['admins'][0])
    # - Admin comments
    admin2_on_admin1_comment = Comment.objects.create(
        content="I'm admin2, and I comment on admin1 post",
        owner=users['admins'][1],
        post=posts['admins'][0])

    # - Company comments
    company1_on_admin2_comment = Comment.objects.create(
        content="I'm company1, and I comment on admin2 post",
        owner=users['companies'][0],
        post=posts['admins'][1])

    # - Student comments
    student1_on_admin3_comment = Comment.objects.create(
        content="I'm student1, and I comment on admin3 post",
        owner=users['students'][0],
        post=posts['admins'][2])

    ################
    # Company Posts:

    # - Self commenting
    company1_on_company1_comment = Comment.objects.create(content="I'm company1, and I comment on my own post",
                                                          owner=users['companies'][0],
                                                          post=posts['companies'][0])
    # - Company comments
    company2_on_company1_comment = Comment.objects.create(
        content="I'm company2, and I comment on company1 post",
        owner=users['companies'][1],
        post=posts['companies'][0])

    # - Admin comments
    admin1_on_company2_comment = Comment.objects.create(
        content="I'm admin1, and I comment on company2 post",
        owner=users['admins'][0],
        post=posts['companies'][1])

    # - Student comments
    student1_on_company3_comment = Comment.objects.create(
        content="I'm student1, and I comment on company3 post",
        owner=users['students'][0],
        post=posts['companies'][2])

    ################
    # Student Posts:

    # - Self commenting
    student1_on_student1_comment = Comment.objects.create(content="I'm student1, and I comment on my own post",
                                                          owner=users['students'][0],
                                                          post=posts['students'][0])
    # - Student comments
    student2_on_student1_comment = Comment.objects.create(
        content="I'm student2, and I comment on student1 post",
        owner=users['students'][1],
        post=posts['students'][0])

    # - Admin comments
    admin1_on_student2_comment = Comment.objects.create(
        content="I'm admin1, and I comment on student2 post",
        owner=users['admins'][0],
        post=posts['companies'][1])

    # - Company comments
    company1_on_student3_comment = Comment.objects.create(
        content="I'm company1, and I comment on student3 post",
        owner=users['companies'][0],
        post=posts['students'][2])

    return {'comments': {
        'admin_post': [admin1_on_admin1_comment, admin2_on_admin1_comment, company1_on_admin2_comment, student1_on_admin3_comment],
        'company_post': [company1_on_company1_comment, company2_on_company1_comment, admin1_on_company2_comment,
                         student1_on_company3_comment],
        'student_post': [student1_on_student1_comment, student2_on_student1_comment, admin1_on_student2_comment,
                         company1_on_student3_comment]},
        'posts': posts,
        'users': users
    }
