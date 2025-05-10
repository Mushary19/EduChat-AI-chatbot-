from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(email=email, password=password)

        if not user:
            raise ValidationError({"error": "Invalid email or password."})

        data["user"] = user
        return data
