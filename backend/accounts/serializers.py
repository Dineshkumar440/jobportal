from rest_framework import serializers
from .models import User
from .models import StudentProfile
from .models import CompanyProfile
from rest_framework import serializers
from .models import StudentProfile

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )

        return user
    

class StudentProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentProfile
        fields = '__all__'


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = '__all__'


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = "__all__"