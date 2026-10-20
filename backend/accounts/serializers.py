
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User,
    StudentProfile,
    CompanyProfile,
)


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
            "role",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
        )

        return user


class StudentProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(
        source="user.first_name",
        required=False,
        allow_blank=True,
    )

    last_name = serializers.CharField(
        source="user.last_name",
        required=False,
        allow_blank=True,
    )

    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    resume = serializers.FileField(
        required=False,
        allow_null=True,
    )

    class Meta:
        model = StudentProfile

        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "phone",
            "location",
            "native_place",
            "education",
            "skills",
            "summary",
            "job_title",
            "work_mode",
            "preferred_location",
            "experience_years",
            "expected_salary",
            "resume",
        ]

    def to_internal_value(self, data):
       data = data.copy()

    # Empty numeric inputs should be treated as NULL.
       for field in ("experience_years", "expected_salary"):
        if data.get(field) == "":
            data[field] = None

       return super().to_internal_value(data)    

    def validate_resume(self, value):

        if value is None:
            return value

        allowed_extensions = (
            ".pdf",
            ".doc",
            ".docx",
        )

        filename = value.name.lower()

        if not filename.endswith(allowed_extensions):
            raise serializers.ValidationError(
                "Upload a PDF, DOC, or DOCX resume."
            )

        max_size = 5 * 1024 * 1024

        if value.size > max_size:
            raise serializers.ValidationError(
                "Resume file must be 5 MB or smaller."
            )

        return value

    def _save_user_fields(self, user, user_data):

        for field, value in user_data.items():
            setattr(user, field, value)

        if user_data:
            user.save(
                update_fields=list(user_data.keys())
            )

    def create(self, validated_data):

        user_data = validated_data.pop("user", {})

        request = self.context.get("request")

        if (
            request is None
            or not request.user.is_authenticated
        ):
            raise serializers.ValidationError(
                "Authentication is required."
            )

        user = request.user

        self._save_user_fields(user, user_data)

        profile, created = StudentProfile.objects.get_or_create(
            user=user,
        )

        for field, value in validated_data.items():
            setattr(profile, field, value)

        profile.save()

        return profile

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", {})

        self._save_user_fields(
            instance.user,
            user_data,
        )

        return super().update(
            instance,
            validated_data,
        )


class CompanyProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyProfile
        fields = "__all__"


class MyTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        if user.is_superuser:
            token["role"] = "admin"
        else:
            token["role"] = user.role

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        if self.user.is_superuser:
            data["role"] = "admin"
        else:
            data["role"] = self.user.role

        return data
