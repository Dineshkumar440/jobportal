from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.models import StudentProfile
from applications.models import Application

from .permissions import IsCompany
from .models import Job
from .serializers import JobSerializer


class JobViewSet(viewsets.ModelViewSet):

    queryset = Job.objects.all()
    serializer_class = JobSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'location', 'description']

    def get_permissions(self):

        if self.action in ['create', 'update', 'destroy']:
            return [IsAuthenticated(), IsCompany()]

        return []

    def perform_create(self, serializer):

        serializer.save(
            company=self.request.user
        )

    @action(detail=True, methods=['get'])
    def applicants(self, request, pk=None):

        job = self.get_object()

        applications = Application.objects.filter(
            job=job
        )

        data = []

        for app in applications:

            try:

                profile = StudentProfile.objects.get(
                    user=app.student
                )

                education = profile.education
                skills = profile.skills

                if profile.resume:
                    resume = profile.resume.url
                else:
                    resume = None

            except StudentProfile.DoesNotExist:

                education = ""
                skills = ""
                resume = None

            data.append({
    "application_id": app.id,
    "student": app.student.username,
    "job": app.job.title,
    "education": education,
    "skills": skills,
    "resume": resume,
    "status": app.status,
    "applied_at": app.applied_at
})
        return Response(data)