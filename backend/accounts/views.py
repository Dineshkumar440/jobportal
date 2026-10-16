from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, StudentProfile, CompanyProfile

from .serializers import (
    RegisterSerializer,
    StudentProfileSerializer,
    CompanyProfileSerializer,
    MyTokenObtainPairSerializer,
)

from jobs.models import Job
from applications.models import Application


import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer

    @action(detail=True, methods=["get"])
    def dashboard(self, request, pk=None):

        profile = self.get_object()

        applications = Application.objects.filter(
            student=profile.user
        )

        jobs = []

        for app in applications:
            jobs.append({
                "job_id": app.job.id,
                "job_title": app.job.title,
                "location": app.job.location,
                "salary": str(app.job.salary),
                "applied_at": app.applied_at,
            })

        return Response({
            "student": profile.user.username,
            "education": profile.education,
            "total_applications": applications.count(),
            "applied_jobs": jobs,
        })


class CompanyProfileViewSet(viewsets.ModelViewSet):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer

    @action(detail=True, methods=["get"])
    def dashboard(self, request, pk=None):

        profile = self.get_object()

        jobs = Job.objects.filter(
            company=profile.user
        )

        total_applicants = 0
        job_list = []

        for job in jobs:

            applicant_count = Application.objects.filter(
                job=job
            ).count()

            total_applicants += applicant_count

            job_list.append({
                "job_id": job.id,
                "title": job.title,
                "location": job.location,
                "salary": str(job.salary),
                "applicants": applicant_count,
            })

        return Response({
            "company": profile.company_name,
            "total_jobs": jobs.count(),
            "total_applicants": total_applicants,
            "jobs": job_list,
        })


class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.username != "Admin":
            return Response(
                {"error": "Permission Denied"},
                status=403
            )

        return Response({
            "students": User.objects.filter(
                role="student"
            ).count(),

            "companies": User.objects.filter(
                role="company"
            ).count(),

            "jobs": Job.objects.count(),

            "applications": Application.objects.count()
        })



class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile, created = StudentProfile.objects.get_or_create(
                user=request.user
            )

            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data)

        except Exception:
            logger.exception(
                "Failed to fetch student profile for user_id=%s",
                request.user.pk,
            )
            return Response(
                {"detail": "Unable to load profile."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request):
        try:
            profile, created = StudentProfile.objects.get_or_create(
                user=request.user
            )

            serializer = StudentProfileSerializer(
                profile,
                data=request.data,
                partial=True,
            )

            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data)

        except Exception:
            logger.exception(
                "Failed to update student profile for user_id=%s",
                request.user.pk,
            )
            return Response(
                {"detail": "Unable to update profile."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DeleteAccountView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request):

        password = request.data.get("password")

        if not password:

            return Response(
                {
                    "error": "Password is required"
                },
                status=400
            )

        if not request.user.check_password(password):

            return Response(
                {
                    "error": "Incorrect password"
                },
                status=400
            )

        request.user.delete()

        return Response(
            {
                "message": "Account deleted successfully"
            },
            status=200
        )


class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer


User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get("email", "").strip()

    # Same response whether the email exists or not
    if email:
        users = User.objects.filter(
            email__iexact=email,
            is_active=True,
        )

        for user in users:
            if not user.email:
                continue

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_url = (
                f"{settings.FRONTEND_URL.rstrip('/')}"
                f"/reset-password/{uid}/{token}"
            )

            subject = "Reset your JobPortal password"
            message = (
                f"Hi {user.get_username()},\n\n"
                "We received a request to reset your JobPortal password.\n\n"
                f"Open this link to choose a new password:\n{reset_url}\n\n"
                "If you did not request this, you can ignore this email."
            )

            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
            except Exception:
                logger.exception("Password reset email could not be sent")

    return Response(
        {
            "detail": (
                "If an account exists for that email, "
                "a password reset link will be sent."
            )
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    uid = request.data.get("uid", "")
    token = request.data.get("token", "")
    password = request.data.get("password", "")

    if not uid or not token or not password:
        return Response(
            {"detail": "UID, token, and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id, is_active=True)
    except (
        TypeError,
        ValueError,
        OverflowError,
        ValidationError,
        User.DoesNotExist,
    ):
        return Response(
            {"detail": "This reset link is invalid or expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not default_token_generator.check_token(user, token):
        return Response(
            {"detail": "This reset link is invalid or expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        validate_password(password, user=user)
    except ValidationError as error:
        return Response(
            {"password": list(error.messages)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.set_password(password)
    user.save(update_fields=["password"])

    return Response(
        {"detail": "Password reset successful. You can now log in."},
        status=status.HTTP_200_OK,
    )

