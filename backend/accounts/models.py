
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("student", "Student"),
        ("company", "Company"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
    )

    def __str__(self):
        return self.username


class StudentProfile(models.Model):

    WORK_MODE_CHOICES = (
        ("remote", "Work from Home"),
        ("hybrid", "Hybrid"),
        ("onsite", "On-site"),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile",
    )

    # Personal information
    phone = models.CharField(
        max_length=15,
        blank=True,
    )

    location = models.CharField(
        max_length=200,
        blank=True,
    )

    native_place = models.CharField(
        max_length=200,
        blank=True,
    )

    # Education and skills
    education = models.CharField(
        max_length=200,
        blank=True,
    )

    skills = models.TextField(
        blank=True,
    )

    summary = models.TextField(
        blank=True,
    )

    # Career preferences
    job_title = models.CharField(
        max_length=200,
        blank=True,
    )

    work_mode = models.CharField(
        max_length=20,
        choices=WORK_MODE_CHOICES,
        blank=True,
    )

    preferred_location = models.CharField(
        max_length=200,
        blank=True,
    )

    experience_years = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        blank=True,
        null=True,
    )

    expected_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
    )

    # Resume upload
    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
    )

    def __str__(self):
        return self.user.username


class CompanyProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    company_name = models.CharField(
        max_length=200,
    )

    website = models.URLField()

    location = models.CharField(
        max_length=200,
    )

    description = models.TextField()

    def __str__(self):
        return self.company_name
