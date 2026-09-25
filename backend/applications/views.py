from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import ApplicationSerializer
from jobs.models import Job


class ApplicationViewSet(viewsets.ModelViewSet):

    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def apply(self, request):

        job_id = request.data.get("job_id")

        try:
            job = Job.objects.get(id=job_id)

        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found"},
                status=404
            )

        if Application.objects.filter(
            student=request.user,
            job=job
        ).exists():

            return Response(
                {"error": "Already Applied"},
                status=400
            )

        Application.objects.create(
            student=request.user,
            job=job
        )

        return Response({
            "message": "Applied Successfully"
        })

    @action(detail=False, methods=['get'])
    def my_applications(self, request):

        applications = Application.objects.filter(
            student=request.user
        )

        data = []

        for app in applications:
            data.append({
                "job": app.job.title,
                "location": app.job.location,
                "status": app.status,
                "applied_at": app.applied_at
            })

        return Response(data)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):

        application = self.get_object()

        application.status = "Accepted"
        application.save()

        return Response({
            "message": "Application Accepted"
        })

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):

        application = self.get_object()

        application.status = "Rejected"
        application.save()

        return Response({
            "message": "Application Rejected"
        })