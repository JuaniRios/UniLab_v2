from rest_framework import permissions

from .data_converters import *
from .models import Job, Company, Post, User, Comment, UserData, EducationData, ExperienceData


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners and super-admins of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        else:
            if request.user.is_superuser:
                return True

            if isinstance(obj, User):
                return obj == request.user
            # TODO: Test UserData, EducationData, ExperienceData
            if isinstance(obj, UserData):
                return obj.user == request.user
            if isinstance(obj, EducationData):
                return obj.user_data.user == request.user
            if isinstance(obj, ExperienceData):
                return obj.user_data.user == request.user
            if isinstance(obj, Job):
                return obj.owner in request.user.companies.all()
            if isinstance(obj, Company):
                return obj.owner == request.user
            if isinstance(obj, Post):
                return obj.owner == request.user
            if isinstance(obj, Comment):
                return obj.owner == request.user


class IsCompanyOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow companies and super-admins to create jobs, but not students. All users can GET.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        else:
            if request.user.is_superuser:
                return True

            elif request.user.is_company:
                return True

            else:
                return False


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_superuser


class CompanyOwner(permissions.BasePermission):
    """"Check that the company creating the job is owned by the user"""
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        elif request.method in permissions.SAFE_METHODS:
            return True

        else:
            owner_url = request.POST.get('owner')
            if owner_url:
                owner = Company.objects.filter(pk=url_to_pk(owner_url)).first()
            else:
                self.message = "Please add the company owner url"
                return False
            return owner in request.user.companies.all()
