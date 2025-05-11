import requests

from chatbot.models.log import ChatLog, ChatSender

from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")
API_KEY = os.getenv("CHATBOT_API_KEY")


def chat_with_bot(prompt, session):

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "deepseek/deepseek-prover-v2:free",
        "messages": [{"role": "user", "content": prompt}],
    }

    ChatLog.objects.create(session=session, sender=ChatSender.USER, message=prompt)

    response = requests.post(url, json=data, headers=headers)

    try:
        result = response.json()
    except ValueError:
        return {
            "status": "error",
            "error": "Sorry, the model did not return a valid response.",
        }

    reply = (
        result["choices"][0]["message"]["content"] or "Sorry, i didn't understand that."
    )

    ChatLog.objects.create(session=session, sender=ChatSender.SYSTEM, message=reply)

    return reply
