from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source='student.username',
        read_only=True
    )

    job_title = serializers.CharField(
        source='job.title',
        read_only=True
    )

    class Meta:
        model = Application
        fields = '__all__'