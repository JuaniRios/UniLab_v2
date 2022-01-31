from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        # if user_type not in [1, 2, 3]:
        #     raise ValueError(_('User type can only be 1 (Admin), 2 (Company), or 3 (Student).'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    # def create_superuser(self, email, first_name, last_name, user_type, password):
    #     email = self.normalize_email(email)
    #     user = self.model(email=email, first_name=first_name, last_name=last_name, user_type=1)
    #     user.set_password(password)
    #     user.save()
    #     from api.models import UserData
    #     UserData.objects.create(user=user)
    #     return user
