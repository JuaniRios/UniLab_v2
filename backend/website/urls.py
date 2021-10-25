from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path("index", views.index2, name="index2"),
    path("", views.index, name="index"),
    path("about", views.about, name="about"),
    path("about", views.about, name="about"),
    path("community", views.community, name="community"),
    path(
        "community/company-select",
        views.community_company_select,
        name="community_company_select",
    ),
    path("companies", views.companies, name="companies"),
    path("companies", views.companies, name="companies"),
    path(
        "fetch/get_job_applications",
        views.get_job_applications,
        name="get_job_applications",
    ),
    path("fetch/get_posts", views.get_posts, name="get-posts"),
    path("fetch/search_objects", views.object_search, name="object-search"),
    path("fetch/delete_objects", views.delete_object, name="object-delete"),
    path("jobs", views.jobs, name="jobs"),
    path("jobs", views.jobs, name="jobs"),
    path("my-companies", views.my_companies, name="my-companies"),
    path("posts", views.single_post, name="single-post"),
    path("profile", views.profile, name="profile"),
    path("settings", views.settings, name="settings"),
    path("sign-in", views.signin, name="signin"),
    path("sign-out", views.signout, name="signout"),
    path("signup", views.signup, name="signup"),
    path("signup/employer", views.signup_employer, name="signup-employer"),
    path("signup/student", views.signup_student, name="signup-student"),
    path("single-job", views.single_job, name="single_job"),
    path("students", views.students, name="students"),
]
