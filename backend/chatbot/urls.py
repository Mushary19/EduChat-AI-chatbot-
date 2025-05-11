from rest_framework.routers import DefaultRouter

from chatbot.apiviewsets.session import ChatSessionViewSet
from chatbot.apiviewsets.log import ChatLogViewSet

chat_router = DefaultRouter()

chat_router.register("session", ChatSessionViewSet, "chat-session")
chat_router.register("", ChatLogViewSet, "chatbot")

urlpatterns = [] + chat_router.urls
