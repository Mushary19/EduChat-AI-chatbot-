from django.dispatch import receiver
from django.db.models.signals import post_save
from chatbot.services.session import generate_title
from chatbot.models.log import ChatLog, ChatSender


@receiver(post_save, sender=ChatLog)
def generate_session_title(sender, instance, created, **kwargs):
    if (
        created
        and instance.session.title == "New Chat"
        and instance.sender == ChatSender.USER
    ):
        session = instance.session
        first_log = instance.session.chat_logs.order_by("timestamp").first()

        result = generate_title(first_log.message, session)
        if result.get("status") == "success":
            session.title = result["title"]
            session.save()
