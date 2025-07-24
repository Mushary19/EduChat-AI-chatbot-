from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from chatbot.services.session import chat_with_bot, generate_title
from chatbot.models.session import ChatSession
from chatbot.serializers.log import ChatLogSerializer
from chatbot.models.log import ChatLog
from rest_framework.response import Response


class ChatLogViewSet(ModelViewSet):
    queryset = ChatLog.objects.all().order_by("created_at")
    serializer_class = ChatLogSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        session_id = self.request.query_params.get("session_id")

        if session_id:
            queryset = queryset.filter(session__session_id=session_id)

        return queryset

    @action(["POST"], url_path="chat", detail=True)
    def chat(self, request, pk=None):
        session = get_object_or_404(ChatSession, session_id=pk)
        prompt = request.data.get("prompt")

        chat_response = ""

        if prompt:
            try:
                chat_response = chat_with_bot(prompt, session, request)
            except Exception as e:
                return Response({"error": str(e)})
        return Response(
            {
                "response": chat_response,
                "session_id": pk,
                "title": session.title,
            }
        )

    @action(["POST"], url_path="generate-title", detail=True)
    def generate_title(self, request, pk=None):
        session = get_object_or_404(ChatSession, session_id=pk)
        prompt = request.data.get("prompt")

        if not prompt:
            return Response({"error": "Prompt is required."}, status=400)

        if session.title != "New Chat":
            return Response({"message": "Title is already set."}, status=200)

        result = generate_title(prompt, session)

        if result.get("status") == "error":
            return Response({"error": result["error"]}, status=500)

        return Response({"message": "Title updated"}, status=200)
