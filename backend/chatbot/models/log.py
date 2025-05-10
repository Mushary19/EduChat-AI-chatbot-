from django.db import models
from chatbot.models.session import ChatSession
from core.models import BaseModel


class ChatType(models.TextChoices):
    USER = "USER", "User"
    SYSTEM = "SYSTEM", "System"


class ChatLog(BaseModel):
    session = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="chat_logs"
    )
    type = models.CharField(max_length=20, choices=ChatType.choices)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.session.user.email} - {self.message}"
