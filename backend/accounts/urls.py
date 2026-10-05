from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    RegisterView,
    StudentProfileViewSet,
    CompanyProfileViewSet,
    StudentProfileView,
    AdminDashboardView,
    DeleteAccountView
)

router = DefaultRouter()

router.register(
    'profiles',
    StudentProfileViewSet
)

router.register(
    'companies',
    CompanyProfileViewSet
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    path(
        'profile/',
        StudentProfileView.as_view(),
        name='profile'
    ),

    path(
        'admin-dashboard/',
        AdminDashboardView.as_view(),
        name='admin-dashboard'
    ),

    path(
        'delete-account/',
        DeleteAccountView.as_view(),
        name='delete-account'
    ),

]

urlpatterns += router.urls

