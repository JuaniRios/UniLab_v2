from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView

from . import views

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc')
]

urlpatterns += [
    path('api/token', views.AccessTokenView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/validate', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/get-user', views.get_user, name='get-user')
]

urlpatterns += [
    # path('api', views.api_root),

    path('api/companies/', views.CompanyList.as_view(), name='company-list'),
    path('api/companies/<int:pk>/', views.CompanyDetail.as_view(), name='company-detail'),
    path('api/companies/choices/', views.CompanyChoices.as_view(), name='job-choices'),

    path('api/company-pictures/', views.CompanyPicturesList.as_view(), name='companypictures-list'),
    path('api/company-pictures/<int:pk>/', views.CompanyPicturesDetail.as_view(), name='companypictures-detail'),

    path('api/users/', views.UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    path('api/user-data/', views.UserDataList.as_view(), name='userdata-list'),
    path('api/user-data/<int:pk>/', views.UserDataDetail.as_view(), name='userdata-detail'),

    path('api/education-data/', views.EducationDataList.as_view(), name='educationdata-list'),
    path('api/education-data/<int:pk>/', views.EducationDataDetail.as_view(), name='educationdata-detail'),

    path('api/vote/', views.VoteList.as_view(), name='vote-list'),
    path('api/vote/<int:pk>/', views.VoteDetail.as_view(), name='vote-detail'),

    path('api/experience-data/', views.ExperienceDataList.as_view(), name='experiencedata-list'),
    path('api/experience-data/<int:pk>/', views.ExperienceDataDetail.as_view(), name='experiencedata-detail'),

    path('api/skill-data/', views.SkillDataList.as_view(), name='skilldata-list'),
    path('api/skill-data/<int:pk>', views.SkillDataDetail.as_view(), name='skilldata-detail'),

    path('api/jobs/', views.JobList.as_view(), name='job-list'),
    path('api/jobs/<int:pk>/', views.JobDetail.as_view(), name='job-detail'),
    path('api/jobs/choices/', views.JobChoices.as_view(), name='job-choices'),

    path('api/posts/', views.PostList.as_view(), name='post-list'),
    path('api/posts/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),

    path('api/comments/', views.CommentList.as_view(), name='comment-list'),
    path('api/comments/<int:pk>/', views.CommentDetail.as_view(), name='comment-detail'),

    path('api/post-report/', views.PostReportList.as_view(), name='postreport-list'),
    path('api/post-report/<int:pk>/', views.PostReportDetail.as_view(), name='postreport-detail'),

    path('api/applications/', views.ApplicationList.as_view(), name='application-list'),
    path('api/applications/<int:pk>', views.ApplicationDetail.as_view(), name='application-detail'),

]

# urlpatterns = format_suffix_patterns(urlpatterns)


