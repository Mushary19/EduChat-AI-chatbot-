from django.db import models
from core.models import BaseModel
import uuid
import datetime


class ChatSession(BaseModel):
    user = models.ForeignKey(
        to="user.User", on_delete=models.CASCADE, related_name="sessions"
    )
    session_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    title = models.CharField(max_length=255, default="New Chat")

    def __str__(self):
        return f"{self.user.email} - {self.title} - {self.created_at}"
