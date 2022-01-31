import json

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .permissions import *
from .serializers import *

User = get_user_model()


@csrf_exempt
def get_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        if not token:
            return JsonResponse({'response': None, 'error': "no token given"})

        """Returns: the user object serialized from a token"""
        try:
            validated_token = JWTAuthentication().get_validated_token(token)
            user_object = JWTAuthentication().get_user(validated_token)
            response = requests.get(
                f"http://{api_url}:{port}/api/users/{user_object.id}",
                headers={"Authorization": f"Bearer {token}"},
            )
            user_json = response.json()
        except InvalidToken as ex:
            print(ex)
            return JsonResponse({'response': None, "error": ex.detail["detail"]})

        except Exception as ex:
            print(ex)
            return JsonResponse({'response': None, "error": "Unknown. Check server console."})

        return JsonResponse({'response': user_json})


class AccessTokenView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        serializer.validated_data.pop('refresh', None)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         'users': reverse('user-list', request=request, format=format),
#         'companies': reverse('company-list', request=request, format=format),
#         'jobs': reverse('job-list', request=request, format=format)
#     })


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]


class ApplicationList(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        company_url = self.request.query_params.get('company')
        if company_url:
            company = Company.objects.filter(pk=url_to_pk(company_url)).first()
            serializer.save(company=company, owner=user)

        else:
            serializer.save(owner=user)

    def get_queryset(self):
        queryset = Comment.objects.all()
        email = self.request.query_params.get('email')
        company_owner = self.request.query_params.get('company_owner')

        if email is not None:
            user = User.objects.filter(email=email).first()
            queryset = queryset.filter(owner=user)

        elif company_owner is not None:
            company_obj = Company.objects.filter(pk=url_to_pk(company_owner)).first()
            queryset = queryset.filter(company=company_obj)

        return queryset


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsCompanyOrReadOnly, IsOwner]


class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsCompanyOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    ordering = ['-id']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Company.objects.all()
        email = self.request.query_params.get('email')
        if email is not None:
            user = User.objects.filter(email=email).first()
            queryset = queryset.filter(owner=user)

        return queryset


class CompanyChoices(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'industry_choices': Company.Industries.choices,
            'employee_choices': Company.EmployeeRange.choices
        }
        return Response(data)


class CompanyPicturesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyPictures.objects.all()
    serializer_class = CompanyPicturesSerializer
    # permission_classes = [IsCompanyOrReadOnly, IsOwner]


class CompanyPicturesList(generics.ListCreateAPIView):
    queryset = CompanyPictures.objects.all()
    serializer_class = CompanyPicturesSerializer

    # permission_classes = []

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.company)

    def get_queryset(self):
        queryset = CompanyPictures.objects.all()
        owner = self.request.query_params.get('owner')
        if owner is not None:
            pk = url_to_pk(owner)
            company = Company.objects.filter(pk=pk).first()
            queryset = queryset.filter(owner=company)
        return queryset


class EducationDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EducationData.objects.all()
    serializer_class = EducationDataSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class EducationDataList(generics.ListCreateAPIView):
    queryset = EducationData.objects.all()
    serializer_class = EducationDataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_data=self.request.user.user_data)


class ExperienceDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExperienceData.objects.all()
    serializer_class = ExperienceDataSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class ExperienceDataList(generics.ListCreateAPIView):
    queryset = ExperienceData.objects.all()
    serializer_class = ExperienceDataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_data=self.request.user.user_data)


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsCompanyOrReadOnly, IsOwner]


class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsCompanyOrReadOnly, CompanyOwner]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    ordering = ['-id']

    def get_queryset(self):
        queryset = Job.objects.all()
        owner = self.request.query_params.get('owner')
        if owner is not None:
            pk = url_to_pk(owner)
            company = Company.objects.filter(pk=pk).first()
            queryset = queryset.filter(owner=company)
        return queryset


class JobChoices(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'category_choices': Job.JobCategories.choices,
            'type_choices': Job.JobType.choices
        }
        return Response(data)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_filters = ['id, publish_date, score']
    ordering = ['-id']

    def perform_create(self, serializer):
        user = self.request.user
        company_url = self.request.query_params.get('company')
        if company_url:
            company = Company.objects.filter(pk=url_to_pk(company_url)).first()
            serializer.save(company=company, owner=user)

        else:
            serializer.save(owner=user)

    def get_queryset(self):
        queryset = Post.objects.all()
        email = self.request.query_params.get('email')
        company_owner = self.request.query_params.get('company_owner')
        if email is not None:
            user = User.objects.filter(email=email).first()
            queryset = queryset.filter(owner=user)

        elif company_owner is not None:
            company_obj = Company.objects.filter(pk=url_to_pk(company_owner)).first()
            queryset = queryset.filter(company=company_obj)

        return queryset


class PostReportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PostReport.objects.all()
    serializer_class = PostReportSerializer
    permission_classes = [IsAuthenticated]


class PostReportList(generics.ListCreateAPIView):
    queryset = PostReport.objects.all()
    serializer_class = PostReportSerializer
    permission_classes = [IsAuthenticated]


class SkillDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SkillData.objects.all()
    serializer_class = ExperienceDataSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class SkillDataList(generics.ListCreateAPIView):
    queryset = SkillData.objects.all()
    serializer_class = SkillDataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_data=self.request.user.user_data)


class UserDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class UserDataList(generics.ListCreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.query_params.get("user")
        pk = re.search(r"users/(\d+)", user)[1]
        return UserData.objects.filter(user=pk)



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwner]


class VoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]


class VoteList(generics.ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        company_url = self.request.query_params.get('company')
        if company_url:
            company = Company.objects.filter(pk=url_to_pk(company_url)).first()
            serializer.save(company=company, user=user)

        else:
            serializer.save(user=user)

    def delete(self, request, *args, **kwargs):
        company_url = self.request.query_params.get('company')
        post_url = request.POST['post']
        post_pk = url_to_pk(post_url)
        post = Post.objects.filter(pk=post_pk).first()
        user = self.request.user

        if company_url is not None:  # if an employer user votes
            assert user.user_type == user.UserType.EMPLOYER, "Only employer users can give a company as vote owner"
            company = Company.objects.filter(pk=url_to_pk(company_url))
            Vote.objects.filter(company=company, post=post).delete()

        else:  # if a student votes

            Vote.objects.filter(user=user, post=post).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdatePassword(APIView):
    """
    An endpoint for changing password.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
