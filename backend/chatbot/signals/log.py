from django.dispatch import receiver
from django.db.models.signals import post_save
from chatbot.models.log import ChatLog, ChatSender
from django_q.tasks import async_task


@receiver(post_save, sender=ChatLog)
def generate_session_title(sender, instance, created, **kwargs):
    session = instance.session
    if created and session.title == "New Chat" and instance.sender == ChatSender.USER:
        async_task(
            "chatbot.tasks.generate_session_title_task",
            instance.message,
            session.id,
        )
