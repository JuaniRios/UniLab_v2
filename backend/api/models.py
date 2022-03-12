from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class Post(models.Model):
    class Meta:
        verbose_name = _('post')
        verbose_name_plural = _('posts')

    content = models.TextField()
    image = models.ImageField(upload_to='post_images/%Y/%m/%D/', blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    publish_date = models.DateField(default=timezone.now)
    company = models.ForeignKey('Company', blank=True, on_delete=models.CASCADE, null=True)


class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='user_image/%Y/%m/%D/', default='defaults/profile.png')

    # class UserType(models.IntegerChoices):
    #     ADMIN = 1, _('Admin')
    #     EMPLOYER = 2, _('Employer')
    #     STUDENT = 3, _('Student')
    #
    # user_type = models.PositiveSmallIntegerField(choices=UserType.choices)
    date_joined = models.DateTimeField(default=timezone.now)
    voted_posts = models.ManyToManyField(Post, blank=True, through='Vote', related_name='votes')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'user_type']

    is_active = models.BooleanField(default=True)
    objects = UserManager()

    allowed_company_creation = models.BooleanField(default=False)
    allowed_university_creation = models.BooleanField(default=False)

    university = models.ForeignKey("University", related_name='students', on_delete=models.CASCADE,
                                   null=True, blank=True)


    @property
    def is_authenticated(self):
        return True

    # @property
    # def is_admin(self):
    #     return self.is_admin

    def __str__(self):
        return self.email


class UserData(models.Model):
    class Meta:
        verbose_name = _('user data')
        verbose_name_plural = _('users data')

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='user_data', on_delete=models.CASCADE)
    biography = models.CharField(blank=True, max_length=100)
    location = models.CharField(blank=True, max_length=100)
    occupation = models.CharField(blank=True, max_length=100, default="Student")
    website = models.TextField(blank=True)


class EducationData(models.Model):
    class Meta:
        verbose_name = _('education data')
        verbose_name_plural = _('education data')

    user_data = models.ForeignKey('UserData', related_name='education_data', on_delete=models.CASCADE)
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='education_image/%Y/%m/%D/', default='defaults/university.jpg')


class ExperienceData(models.Model):
    class Meta:
        verbose_name = _('experience data')
        verbose_name_plural = _('experience data')

    user_data = models.ForeignKey('UserData', related_name='experience_data', on_delete=models.CASCADE)
    company = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='experience_image/%Y/%m/%D/', default='defaults/experience.jpg')
    # stored_company = models.ForeignKey('Company', related_name='employees', on_delete=models.CASCADE, blank=True, null=True)


class SkillData(models.Model):
    class Meta:
        verbose_name = _('skill data')
        verbose_name_plural = _('skill data')

    user_data = models.ForeignKey('UserData', related_name='skill_data', on_delete=models.CASCADE)
    category = models.CharField(max_length=200)
    skill = models.CharField(max_length=200)


class Company(models.Model):
    class Meta:
        verbose_name = _('company')
        verbose_name_plural = _('companies')

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(blank=True, null=True)
    video_url = models.CharField(max_length=200, blank=True)
    website_url = models.CharField(max_length=200, blank=True)
    publish_date = models.DateField(default=timezone.now)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='companies', on_delete=models.CASCADE)
    admins = models.ManyToManyField(User, blank=True, through='CompanyAdmin', related_name='company_admins')
    image = models.ImageField(upload_to='company_image/%Y/%m/%D/', default='defaults/company.jpg')
    country = models.CharField(max_length=200, blank=True)

    class EmployeeRange(models.IntegerChoices):
        TINY = 1, _('1-20 employees'),
        SMALL = 2, _('21-100 employees'),
        MEDIUM = 3, _('101-200 employees'),
        LARGE = 4, _('201-500 employees'),
        HUGE = 5, _('501+ employees')

    employee_range = models.IntegerField(choices=EmployeeRange.choices)

    class Industries(models.IntegerChoices):
        ENERGY = 1, _('Energy, Utilities and Resources'),
        GOVERNMENT = 2, _('Government and Public Sector'),
        PHARMA = 3, _('Pharmaceuticals and Life Sciences'),
        ESTATE = 4, _('Real Estate'),
        SPORTS = 5, _('Sports Business Advisory'),
        FINANCE = 6, _('Financial Services'),
        HEALTH = 7, _('Health Services'),
        MANUFACTURE = 8, _('Industrial Manufacturing'),
        RETAIL = 9, _('Retail and Consumer Goods'),
        TECH = 10, _('Technology, Media, and Telecommunications')
        OTHER = 11, _('Other')

    industry = models.IntegerField(choices=Industries.choices)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class CompanyAdmin(models.Model):
    class Meta:
        verbose_name = _('company Admin')
        verbose_name_plural = _('company Admins')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    post_permission = models.BooleanField(default=False)
    comment_permission = models.BooleanField(default=False)
    create_jobs_permission = models.BooleanField(default=False)
    accept_applicants_permission = models.BooleanField(default=False)
    view_applicants_permission = models.BooleanField(default=False)
    edit_profile_permission = models.BooleanField(default=False)
    edit_admins_permission = models.BooleanField(default=False)


class University(models.Model):
    class Meta:
        verbose_name = _('university')
        verbose_name_plural = _('universities')

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(blank=True, null=True)
    video_url = models.CharField(max_length=200, blank=True)
    website_url = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    country = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='universities', on_delete=models.CASCADE)
    admins = models.ManyToManyField(User, blank=True, through='UniversityAdmin', related_name='university_admins')
    image = models.ImageField(upload_to='company_image/%Y/%m/%D/', default='defaults/university.jpg')

    class StudentRange(models.IntegerChoices):
        SMALL = 1, _('<5000 students'),
        MEDIUM = 2, _('5000-15000 students'),
        LARGE = 3, _('>15000 students'),

    student_range = models.IntegerField(choices=StudentRange.choices, blank=True, null=True)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class UniversityAdmin(models.Model):
    class Meta:
        verbose_name = _('university admin')
        verbose_name_plural = _('university admins')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    post_permission = models.BooleanField(default=False)
    comment_permission = models.BooleanField(default=False)
    edit_profile_permission = models.BooleanField(default=False)
    accept_student_application_permission = models.BooleanField(default=False)


class Vote(models.Model):
    class Meta:
        verbose_name = _('vote')
        verbose_name_plural = _('votes')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    UPVOTE = 1
    DOWNVOTE = 2
    TYPE_CHOICES = [
        (UPVOTE, _('Upvote')),
        (DOWNVOTE, _('Downvote'))
    ]
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICES)


class CompanyPictures(models.Model):
    class Meta:
        verbose_name = _('company picture')
        verbose_name_plural = _('company pictures')

    owner = models.ForeignKey('Company', related_name='pictures', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='company_pictures/%Y/%m/%D/')
    description = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)


class Job(models.Model):
    class Meta:
        verbose_name = _('job')
        verbose_name_plural = _('jobs')

    title = models.CharField(max_length=200)
    owner = models.ForeignKey('Company', on_delete=models.CASCADE, related_name='jobs')
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    hours_per_week = models.DecimalField(max_digits=3, decimal_places=1)
    salary_per_month = models.PositiveIntegerField()
    publish_date = models.DateField(default=timezone.now)
    requirements = models.TextField(blank=True)
    you_do = models.TextField(blank=True)
    we_offer = models.TextField(blank=True)
    employment_details = models.TextField(blank=True)
    applicants = models.ManyToManyField(User, blank=True, through='Application', related_name="job")

    class JobCategories(models.IntegerChoices):
        ADMINISTRATIVE = 1, _('Administrative')
        ARTS_AND_DESIGN = 2, _('Arts & Design')
        BUSINESS = 3, _('Business')
        CONSULTING = 4, _('Consulting')
        CUSTOMER_AND_SUPPORT = 5, _('Customer Services & Support')
        EDUCATION = 6, _('Education')
        ENGINEERING = 7, _('Engineering')
        FINANCE_AND_ACCOUNTING = 8, _('Finance & Accounting')
        HEALTHCARE = 9, _('Healthcare')
        HUMAN_RESOURCES = 10, _('Human Resources')
        IT = 11, _('Information Technology')
        LEGAL = 12, _('Legal')
        MARKETING = 13, _('Marketing')
        MEDIA_AND_COMMUNICATIONS = 14, _('Media & Communications')
        MILITARY_AND_PROTECTIVE = 15, _("Military & Protective Services")
        OPERATIONS = 16, _("Operations")
        OTHER = 17, _("Other")
        PRODUCT_AND_PROJECT_MANAGEMENT = 18, _("Product & Project Management")
        RESEARCH_AND_SCIENCE = 19, _("Research & Science")
        RETAIL_AND_FOOD = 20, _("Retail & Food Services")
        SALES = 21, _("Sales")
        SKILLED_LABOR_AND_MANUFACTURING = 22, _("Skilled Labor & Manufacturing")
        TRANSPORTATION = 23, _("Transportation")

    category = models.IntegerField(choices=JobCategories.choices)

    class JobType(models.IntegerChoices):
        FULL_TIME = 1, _("Full-time")
        PART_TIME = 2, _("Part-time")
        CONTRACT = 3, _("Contract")
        TEMPORARY = 4, _("Temporary")
        INTERNSHIP = 5, _("Internship")

    type = models.IntegerField(choices=JobType.choices)

    def __repr__(self):
        return self.title

    def __str__(self):
        return self.title


class Application(models.Model):
    class Meta:
        verbose_name = _('application')
        verbose_name_plural = _('applications')

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    cv = models.FileField(upload_to='cv/%Y/%m/%d/')
    motivation_letter = models.FileField(upload_to='motivation_letter/%Y/%m/%d/')


class Comment(models.Model):
    class Meta:
        verbose_name = _('comment')
        verbose_name_plural = _('comments')

    content = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    publish_date = models.DateField(default=timezone.now)


class PostReport(models.Model):
    class Meta:
        verbose_name = _('post report')
        verbose_name_plural = _('post reports')

    post = models.ForeignKey('Post', related_name='reports', on_delete=models.CASCADE)
    description = models.TextField()

    class Reasons(models.IntegerChoices):
        SPAM = 1, _('Spam')
        OFFENSIVE = 2, _('Offensive')
        MISLEADING = 3, _('Misleading')

    reason = models.PositiveSmallIntegerField(choices=Reasons.choices)


class FeedbackForm(models.Model):
    class Meta:
        verbose_name = "feedback form"
        verbose_name_plural = "feedback forms"

    class Scale(models.IntegerChoices):
        VERY_BAD = 1, "Very Bad"
        BAD = 2, "Bad"
        COULD_BE_BETTER = 3, "Could be Better"
        ALRIGHT = 4, "Alright"
        GOOD = 5, "Good"
        VERY_GOOD = 6, "Very Good"
        INCREDIBLE = 7, "Incredible"

    institution = models.TextField()
    country = models.TextField()
    looks = models.PositiveSmallIntegerField(choices=Scale.choices)
    accessibility = models.PositiveSmallIntegerField(choices=Scale.choices)
    usability = models.PositiveSmallIntegerField(choices=Scale.choices)
    future_use = models.BooleanField()
    recommend = models.BooleanField()
    comments = models.TextField()
