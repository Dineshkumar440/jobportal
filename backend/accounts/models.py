from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = (
        ('student', 'Student'),
        ('company', 'Company'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    def __str__(self):
        return self.username
    

class StudentProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    phone = models.CharField(
        max_length=15
    )

    education = models.CharField(
        max_length=200
    )

    skills = models.TextField()

    resume = models.FileField(
        upload_to='resumes/'
    )

    def __str__(self):
        return self.user.username
    
class CompanyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    company_name = models.CharField(max_length=200)
    website = models.URLField()
    location = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.company_name