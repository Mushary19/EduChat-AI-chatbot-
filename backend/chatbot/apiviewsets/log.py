from rest_framework.viewsets import ModelViewSet

from chatbot.serializers.log import ChatLogSerializer
from chatbot.models.log import ChatLog


class ChatLogViewSet(ModelViewSet):
    queryset = ChatLog.objects.all().order_by("-created_at")
    serializer_class = ChatLogSerializer
