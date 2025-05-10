from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from user.models import User


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        email = validated_data.get("email")
        password = validated_data.pop("password")
        confirm_password = validated_data.pop("confirm_password")

        normalized_email = email.lower()

        if User.objects.filter(email__iexact=normalized_email).exists():
            raise ValidationError(
                {"error": "Email already taken. Please use different email."}
            )

        if password != confirm_password:
            raise ValidationError({"error": "Passwords do not match."})

        if password == confirm_password and len(password) < 8:
            raise ValidationError({"error": "Password must be minimum 8 character."})

        validated_data["email"] = normalized_email
        user = User.objects.create_user(password=password, **validated_data)

        return user
