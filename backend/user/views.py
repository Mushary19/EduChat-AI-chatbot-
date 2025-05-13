from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from user.serializers.user import UserSerializer
from user.serializers.login import LoginSerializer
from user.serializers.register import RegisterSerializer


@api_view(["POST"])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data["user"]
        ser = UserSerializer(user)
        return Response({"user": ser.data}, 200)

    if serializer.errors:
        error = serializer.errors.get("error", "Something went wrong.")
    return Response({"error": error[0]}, status=400)


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"}, status=status.HTTP_201_CREATED
        )

    if serializer.errors:
        error = serializer.errors.get("error", "Something went wrong.")
    return Response({"error": error}, status=400)
