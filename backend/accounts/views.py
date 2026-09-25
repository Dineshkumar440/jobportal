from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from jobs.models import Job
from applications.models import Application
from .models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import StudentProfile, CompanyProfile
from .serializers import (
    RegisterSerializer,
    StudentProfileSerializer,
    CompanyProfileSerializer,
)

from applications.models import Application
from jobs.models import Job


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

        jobs = Job.objects.filter(company=profile.user)

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
            "students": User.objects.filter(role="student").count(),
            "companies": User.objects.filter(role="company").count(),
            "jobs": Job.objects.count(),
            "applications": Application.objects.count()
        })


class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile = StudentProfile.objects.get(
            user=request.user
        )

        serializer = StudentProfileSerializer(profile)

        return Response(serializer.data)

    def put(self, request):

        profile = StudentProfile.objects.get(
            user=request.user
        )

        serializer = StudentProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )
