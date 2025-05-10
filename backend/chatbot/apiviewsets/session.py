from rest_framework.viewsets import ModelViewSet

from chatbot.serializers.session import ChatSessionSerializer
from chatbot.models.session import ChatSession


class ChatSessionViewSet(ModelViewSet):
    queryset = ChatSession.objects.all().order_by("-created_at")
    serializer_class = ChatSessionSerializer
