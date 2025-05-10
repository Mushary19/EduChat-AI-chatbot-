from django.db import models
from chatbot.models.session import ChatSession
from core.models import BaseModel


class ChatLog(BaseModel):
    session = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="chat_logs"
    )
