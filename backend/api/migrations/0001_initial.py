# Generated by Django 3.2.4 on 2022-02-21 00:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('image', models.ImageField(default='defaults/profile.png', upload_to='user_image/%Y/%m/%D/')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_active', models.BooleanField(default=True)),
                ('allowed_company_creation', models.BooleanField(default=False)),
                ('allowed_university_creation', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cv', models.FileField(upload_to='cv/%Y/%m/%d/')),
                ('motivation_letter', models.FileField(upload_to='motivation_letter/%Y/%m/%d/')),
            ],
            options={
                'verbose_name': 'application',
                'verbose_name_plural': 'applications',
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('rating', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('video_url', models.CharField(blank=True, max_length=200)),
                ('website_url', models.CharField(blank=True, max_length=200)),
                ('publish_date', models.DateField(default=django.utils.timezone.now)),
                ('image', models.ImageField(default='defaults/company.jpg', upload_to='company_image/%Y/%m/%D/')),
                ('country', models.CharField(blank=True, max_length=200)),
                ('employee_range', models.IntegerField(choices=[(1, '1-20 employees'), (2, '21-100 employees'), (3, '101-200 employees'), (4, '201-500 employees'), (5, '501+ employees')])),
                ('industry', models.IntegerField(choices=[(1, 'Energy, Utilities and Resources'), (2, 'Government and Public Sector'), (3, 'Pharmaceuticals and Life Sciences'), (4, 'Real Estate'), (5, 'Sports Business Advisory'), (6, 'Financial Services'), (7, 'Health Services'), (8, 'Industrial Manufacturing'), (9, 'Retail and Consumer Goods'), (10, 'Technology, Media, and Telecommunications'), (11, 'Other')])),
            ],
            options={
                'verbose_name': 'company',
                'verbose_name_plural': 'companies',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='post_images/%Y/%m/%D/')),
                ('publish_date', models.DateField(default=django.utils.timezone.now)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.company')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'post',
                'verbose_name_plural': 'posts',
            },
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('rating', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('video_url', models.CharField(blank=True, max_length=200)),
                ('website_url', models.CharField(blank=True, max_length=200)),
                ('city', models.CharField(blank=True, max_length=200)),
                ('country', models.CharField(blank=True, max_length=200)),
                ('image', models.ImageField(default='defaults/university.jpg', upload_to='company_image/%Y/%m/%D/')),
                ('student_range', models.IntegerField(blank=True, choices=[(1, '<5000 students'), (2, '5000-15000 students'), (3, '>15000 students')], null=True)),
            ],
            options={
                'verbose_name': 'university',
                'verbose_name_plural': 'universities',
            },
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Upvote'), (2, 'Downvote')])),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.company')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'vote',
                'verbose_name_plural': 'votes',
            },
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('biography', models.CharField(blank=True, max_length=100)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('occupation', models.CharField(blank=True, default='Student', max_length=100)),
                ('website', models.TextField(blank=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_data', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user data',
                'verbose_name_plural': 'users data',
            },
        ),
        migrations.CreateModel(
            name='UniversityAdmin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_permission', models.BooleanField(default=False)),
                ('comment_permission', models.BooleanField(default=False)),
                ('edit_profile_permission', models.BooleanField(default=False)),
                ('accept_student_application_permission', models.BooleanField(default=False)),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.university')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'university admin',
                'verbose_name_plural': 'university admins',
            },
        ),
        migrations.AddField(
            model_name='university',
            name='admins',
            field=models.ManyToManyField(blank=True, related_name='university_admins', through='api.UniversityAdmin', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='university',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='universities', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='SkillData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=200)),
                ('skill', models.CharField(max_length=200)),
                ('user_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='skill_data', to='api.userdata')),
            ],
            options={
                'verbose_name': 'skill data',
                'verbose_name_plural': 'skill data',
            },
        ),
        migrations.CreateModel(
            name='PostReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('reason', models.PositiveSmallIntegerField(choices=[(1, 'Spam'), (2, 'Offensive'), (3, 'Misleading')])),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reports', to='api.post')),
            ],
            options={
                'verbose_name': 'post report',
                'verbose_name_plural': 'post reports',
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=200)),
                ('hours_per_week', models.DecimalField(decimal_places=1, max_digits=3)),
                ('salary_per_month', models.PositiveIntegerField()),
                ('publish_date', models.DateField(default=django.utils.timezone.now)),
                ('requirements', models.TextField(blank=True)),
                ('you_do', models.TextField(blank=True)),
                ('we_offer', models.TextField(blank=True)),
                ('employment_details', models.TextField(blank=True)),
                ('category', models.IntegerField(choices=[(1, 'Administrative'), (2, 'Arts & Design'), (3, 'Business'), (4, 'Consulting'), (5, 'Customer Services & Support'), (6, 'Education'), (7, 'Engineering'), (8, 'Finance & Accounting'), (9, 'Healthcare'), (10, 'Human Resources'), (11, 'Information Technology'), (12, 'Legal'), (13, 'Marketing'), (14, 'Media & Communications'), (15, 'Military & Protective Services'), (16, 'Operations'), (17, 'Other'), (18, 'Product & Project Management'), (19, 'Research & Science'), (20, 'Retail & Food Services'), (21, 'Sales'), (22, 'Skilled Labor & Manufacturing'), (23, 'Transportation')])),
                ('type', models.IntegerField(choices=[(1, 'Full-time'), (2, 'Part-time'), (3, 'Contract'), (4, 'Temporary'), (5, 'Internship')])),
                ('applicants', models.ManyToManyField(blank=True, related_name='applications', through='api.Application', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='api.company')),
            ],
            options={
                'verbose_name': 'job',
                'verbose_name_plural': 'jobs',
            },
        ),
        migrations.CreateModel(
            name='ExperienceData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField()),
                ('image', models.ImageField(default='defaults/experience.jpg', upload_to='experience_image/%Y/%m/%D/')),
                ('user_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experience_data', to='api.userdata')),
            ],
            options={
                'verbose_name': 'experience data',
                'verbose_name_plural': 'experience data',
            },
        ),
        migrations.CreateModel(
            name='EducationData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institution', models.CharField(max_length=200)),
                ('degree', models.CharField(max_length=200)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField()),
                ('image', models.ImageField(default='defaults/university.jpg', upload_to='education_image/%Y/%m/%D/')),
                ('user_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='education_data', to='api.userdata')),
            ],
            options={
                'verbose_name': 'education data',
                'verbose_name_plural': 'education data',
            },
        ),
        migrations.CreateModel(
            name='CompanyPictures',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='company_pictures/%Y/%m/%D/')),
                ('description', models.TextField(blank=True, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pictures', to='api.company')),
            ],
            options={
                'verbose_name': 'company picture',
                'verbose_name_plural': 'company pictures',
            },
        ),
        migrations.CreateModel(
            name='CompanyAdmin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_permission', models.BooleanField(default=False)),
                ('comment_permission', models.BooleanField(default=False)),
                ('create_jobs_permission', models.BooleanField(default=False)),
                ('accept_applicants_permission', models.BooleanField(default=False)),
                ('view_applicants_permission', models.BooleanField(default=False)),
                ('edit_profile_permission', models.BooleanField(default=False)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.company')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'company Admin',
                'verbose_name_plural': 'company Admins',
            },
        ),
        migrations.AddField(
            model_name='company',
            name='admins',
            field=models.ManyToManyField(blank=True, related_name='company_admins', through='api.CompanyAdmin', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='company',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='companies', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('publish_date', models.DateField(default=django.utils.timezone.now)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.company')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.post')),
            ],
            options={
                'verbose_name': 'comment',
                'verbose_name_plural': 'comments',
            },
        ),
        migrations.AddField(
            model_name='application',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.job'),
        ),
        migrations.AddField(
            model_name='application',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='voted_posts',
            field=models.ManyToManyField(blank=True, related_name='votes', through='api.Vote', to='api.Post'),
        ),
    ]