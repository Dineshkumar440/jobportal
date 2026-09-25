from django.db import models
from accounts.models import User
from jobs.models import Job

class Application(models.Model):

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    status = models.CharField(
    max_length=20,
    default='Pending'
    )

    class Meta:
        unique_together = ['student', 'job']

    def __str__(self):
        return f"{self.student.username} applied for {self.job.title}"
    