from rest_framework.viewsets import ModelViewSet

from chatbot.serializers.session import ChatSessionSerializer
from chatbot.models.session import ChatSession


class ChatSessionViewSet(ModelViewSet):
    queryset = ChatSession.objects.all().order_by("-created_at")
    serializer_class = ChatSessionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get("user_id")

        if user_id:
            queryset = queryset.filter(user__id=user_id)

        return queryset
