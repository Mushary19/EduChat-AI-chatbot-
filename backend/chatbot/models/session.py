from django.db import models
from core.models import BaseModel
import uuid


class ChatSession(BaseModel):
    session_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    title = models.CharField(max_length=255, default="New Chat")
