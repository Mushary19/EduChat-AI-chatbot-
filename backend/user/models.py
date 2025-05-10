from django.db import models
from django.contrib.auth.models import AbstractUser

from user.manager import CustomUserManager
from core.models import BaseModel


class User(AbstractUser, BaseModel):
    username = None
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email
