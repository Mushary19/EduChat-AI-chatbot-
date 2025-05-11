from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from chatbot.services.session import chat_with_bot
from chatbot.models.session import ChatSession
from chatbot.serializers.log import ChatLogSerializer
from chatbot.models.log import ChatLog
from rest_framework.response import Response


class ChatLogViewSet(ModelViewSet):
    queryset = ChatLog.objects.all().order_by("-created_at")
    serializer_class = ChatLogSerializer

    @action(["POST"], url_path="chat", detail=True)
    def chat(self, request, pk=None):
        session = get_object_or_404(ChatSession, id=pk)
        prompt = request.data.get("prompt")

        chat_response = ""

        if prompt:
            try:
                chat_response = chat_with_bot(prompt, session)
            except Exception as e:
                return Response({"error": str(e)})
        return Response({"response": chat_response})
