from chatbot.models.session import ChatSession
from chatbot.services.session import generate_title


def generate_session_title_task(prompt, session_id):
    try:
        session = ChatSession.objects.get(id=session_id)

        result = generate_title(prompt)
        if result.get("status") == "success":
            session.title = result["title"]
            session.save()
            session.refresh_from_db()
    except ChatSession.DoesNotExist:
        pass
