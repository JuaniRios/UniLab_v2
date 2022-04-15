from django.conf import settings as conf_settings
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .data_converters import *
from .models import *

api_url = conf_settings.API_URL
port = conf_settings.PORT
UserModel = get_user_model()


class EducationDataSerializer(serializers.HyperlinkedModelSerializer):
    user_data = serializers.HyperlinkedRelatedField(read_only=True, view_name='userdata-detail', many=False)

    class Meta:
        model = EducationData
        fields = '__all__'


class ExperienceDataSerializer(serializers.HyperlinkedModelSerializer):
    user_data = serializers.HyperlinkedRelatedField(read_only=True, view_name='userdata-detail', many=False)

    class Meta:
        model = ExperienceData
        fields = '__all__'


class SkillDataSerializer(serializers.HyperlinkedModelSerializer):
    user_data = serializers.HyperlinkedRelatedField(read_only=True, view_name='userdata-detail', many=False)

    class Meta:
        model = SkillData
        fields = '__all__'


class ExternalProfileSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(read_only=True, view_name='userdata-detail', many=False)
    class Meta:
        model = ExternalProfile
        fields = "__all__"


class UniversityCourseSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(read_only=True, view_name='userdata-detail', many=False)
    class Meta:
        model = UniversityCourse
        fields = "__all__"


class CertificationSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='userdata-detail', read_only=True, many=False)
    class Meta:
        model = Certification
        fields = "__all__"


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', many=False)
    education_data = EducationDataSerializer(many=True, read_only=True)
    experience_data = ExperienceDataSerializer(many=True, read_only=True)
    external_profiles = ExternalProfileSerializer(many=True, read_only=True)
    university_courses = UniversityCourseSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    skill_data = SkillDataSerializer(many=True, read_only=True)

    class Meta:
        model = UserData
        fields = '__all__'


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', many=False)
    rating = serializers.ReadOnlyField()
    publish_date = serializers.ReadOnlyField()
    employee_range_verbose = serializers.CharField(source='get_employee_range_display', read_only=True)
    industry_verbose = serializers.CharField(source='get_industry_display', read_only=True)

    class Meta:
        model = Company
        # fields = ('url', 'name', 'owner', 'publish_date', 'description', 'video_url', 'website_url', 'rating')
        fields = "__all__"


class CompanyAdminSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects.all())
    company = serializers.HyperlinkedRelatedField(view_name='company-detail', queryset=Company.objects.all())

    class Meta:
        model = CompanyAdmin
        fields = '__all__'

    def validate(self, data):
        # check for duplicates
        user = data['user']
        company = data['company']

        existing = CompanyAdmin.objects.filter(user=user, company=company).first()
        if existing:
            return serializers.ValidationError("User already an admin")

        return data


class UniversitySerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', many=False)
    rating = serializers.ReadOnlyField()
    student_range_verbose = serializers.CharField(source='get_student_range_display', read_only=True, allow_blank=True)
    students = serializers.HyperlinkedRelatedField(many=True, queryset=User.objects.all(), view_name='user-detail',
                                                   required=False)

    class Meta:
        model = University
        fields = "__all__"


class UniversityAdminSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects.all())
    university = serializers.HyperlinkedRelatedField(view_name='university-detail', queryset=University.objects.all())

    class Meta:
        model = UniversityAdmin
        fields = '__all__'

    def validate(self, data):
        # check for duplicates
        user = data['user']
        university = data['university']

        existing = UniversityAdmin.objects.filter(user=user, university=university).first()
        if existing:
            return serializers.ValidationError("User already an admin")

        return data


class CompanyPicturesSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='company-detail', many=False, queryset=Company.objects.all())

    class Meta:
        model = CompanyPictures
        fields = "__all__"


class JobSerializer(serializers.HyperlinkedModelSerializer):
    publish_date = serializers.ReadOnlyField()
    owner = serializers.HyperlinkedRelatedField(view_name='company-detail', queryset=Company.objects.all(),
                                              write_only=True, required=True)
    company = serializers.SerializerMethodField()
    category_verbose = serializers.CharField(source='get_category_display', read_only=True)
    type_verbose = serializers.CharField(source='get_type_display', read_only=True)
    applications = serializers.HyperlinkedRelatedField(many=True, view_name='application-detail',
                                                       queryset=Application.objects.all(), required=False)

    class Meta:
        model = Job
        fields = '__all__'

    def get_company(self, job):
        result = CompanySerializer(job.owner, context={'request': self.context['request']}).data
        return result

    # def validate_owner(self, value):
    #     """
    #     Check that the company belongs to the user
    #     """
    #     user = self.context['request'].user
    #
    #     if value.owner == user:
    #         return value
    #     else:
    #         raise serializers.ValidationError('Company does not belong to current user')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='user-detail')
    companies = serializers.HyperlinkedRelatedField(many=True, view_name='company-detail',
                                                    queryset=Company.objects.all(), required=False)
    applications = serializers.HyperlinkedRelatedField(many=True, view_name='application-detail',
                                                       queryset=Application.objects.all(), required=False)
    password = serializers.CharField(write_only=True)
    user_data = serializers.HyperlinkedRelatedField(many=False, view_name='userdata-detail', read_only=True)
    # user_type_verbose = serializers.SerializerMethodField()
    voted_posts = serializers.HyperlinkedRelatedField(many=True, view_name='post-detail', queryset=Post.objects.all(),
                                                      required=False)
    occupation = serializers.SerializerMethodField()
    company_admins = serializers.HyperlinkedRelatedField(many=True, view_name="companyadmin-detail",
                                                         queryset=CompanyAdmin.objects.all(), required=False)
    university_admins = serializers.HyperlinkedRelatedField(many=True, view_name="universityadmin-detail",
                                                            queryset=UniversityAdmin.objects.all(), required=False)

    class Meta:
        model = UserModel
        fields = '__all__'

    # hide empty companies attribute for students
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # if instance.user_type == UserModel.UserType.STUDENT:
        #     del ret['companies']

        return ret

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        UserData.objects.create(user=user)

        return user

    def get_occupation(self, obj):
        return obj.user_data.occupation


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    publish_date = serializers.ReadOnlyField()
    owner = UserSerializer(read_only=True, many=False)
    company = CompanySerializer(read_only=True, many=False)
    post = serializers.HyperlinkedRelatedField(view_name='post-detail', many=False, queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.HyperlinkedModelSerializer):
    publish_date = serializers.ReadOnlyField()
    owner = UserSerializer(read_only=True, many=False)
    company = CompanySerializer(read_only=True, many=False, required=False)
    comments = CommentSerializer(many=True, read_only=True)
    votes = serializers.SerializerMethodField(method_name='create_votes')
    score = serializers.SerializerMethodField(method_name='create_score')
    user_vote = serializers.SerializerMethodField(method_name='create_user_vote')

    class Meta:
        model = Post
        fields = '__all__'

    def create_score(self, post):
        upvotes = Vote.objects.filter(post=post, type=1)
        downvotes = Vote.objects.filter(post=post, type=2)
        return len(upvotes) - len(downvotes)

    def create_votes(self, post):
        votes = Vote.objects.filter(post=post)
        serializer = VoteSerializer(many=True, data=list(votes), context={'request': self.context.get('request')})
        serializer.is_valid()
        serialized_votes = serializer.data
        output = {'upvotes': [], 'downvotes': []}
        for vote in serialized_votes:
            if vote['type'] == 1:
                output['upvotes'] += [vote['user']]
            else:
                output['downvotes'] += [vote['user']]

        return output

    def create_user_vote(self, post):
        # show what the user requesting the api voted
        user = self.context['request'].user
        company_url = self.context['request'].query_params.get('company')
        if company_url:
            company_url = self.context['request'].query_params.get('company')
            assert company_url is not None, "Employer user should always specify a company in query (?company=url)"
            company_pk = url_to_pk(company_url)
            company = Company.objects.filter(pk=company_pk).first()
            vote = Vote.objects.filter(post=post, company=company).first()
        else:
            vote = Vote.objects.filter(post=post, user=user).first()

        vote_label = None
        if vote:
            # go through all types of labels and get the one matching the attribute type of vote (int).
            for label_tup in vote.TYPE_CHOICES:
                if label_tup[0] == vote.type:
                    vote_label = label_tup[1]
                    break

        return vote_label


# custom field to fetch user linked to a user_data model
class UserDataToUserField(serializers.RelatedField):
    def to_representation(self, value):
        return f'https://{api_url}:{port}/api/users/{value.user.id}/'


class VoteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=UserModel.objects.all())
    company = serializers.HyperlinkedRelatedField(view_name='company-detail', queryset=Company.objects.all(),
                                                  required=False)
    # user_data = serializers.HyperlinkedRelatedField(view_name='userdata-detail', queryset=UserData.objects.all())
    post = serializers.HyperlinkedRelatedField(view_name='post-detail', queryset=Post.objects.all())

    class Meta:
        model = Vote
        fields = '__all__'

    # def convert_userdata(self, vote):
    #     user_pk = vote.user_data.user.id
    #     return f'https://{api_url}:{port}/api/users/{user_pk}/'

    def create(self, validated_data):
        # delete previous votes from the same user on same post
        user = validated_data['user']
        post = validated_data['post']
        company = validated_data.get('company')
        if company is not None:
            assert user.user_type == user.UserType.EMPLOYER, "Only employer users can give a company as vote owner (custom code)"
            previous_vote = Vote.objects.filter(company=company, post=post)
            previous_vote.delete()

        else:
            previous_vote = Vote.objects.filter(user=user, post=post)
            previous_vote.delete()

        return super().create(validated_data)


class PostReportSerializer(serializers.HyperlinkedModelSerializer):
    post = serializers.HyperlinkedRelatedField(view_name='post-detail', queryset=Post.objects.all())

    class Meta:
        model = PostReport
        fields = '__all__'


class ApplicationSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    job = JobSerializer(read_only=True, many=False)
    # job = serializers.HyperlinkedRelatedField(view_name='job-detail', queryset=Job.objects.all())

    class Meta:
        model = Application
        fields = '__all__'


    def create(self, validated_data):
        # delete previous application from the same user on same job
        user = validated_data['user']
        job = validated_data['job']

        previous_vote = Application.objects.filter(user=user, job=job)
        previous_vote.delete()

        return super().create(validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class FeedbackFormSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FeedbackForm
        fields = "__all__"



