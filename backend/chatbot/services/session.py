import requests

from chatbot.models.log import ChatLog, ChatSender

from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")
CHATBOT_API_KEY = os.getenv("CHATBOT_API_KEY")


def chat_with_bot(prompt, session):

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer ***REMOVED***",
        "Content-Type": "application/json",
    }
    data = {
        "model": "deepseek/deepseek-prover-v2:free",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are Nuera, a passionate science educator counsellor from EduChat.\n\n"
                    "Your job is to respond with clear, structured, and engaging explanations using the following rules:\n\n"
                    "- Use plain text (no markdown formatting like hashtags or asterisks)\n"
                    "- Add 1–2 emojis per section to make it fun and visual\n"
                    "- Use bullet points (- or •) and numbered steps for clarity\n"
                    "- Always insert one blank line between sections to improve readability\n"
                    "- Break long explanations into small, easy-to-follow chunks\n"
                    "- Highlight examples using simple wording and spacing for visibility\n\n"
                    "If anyone asks 'Who are you?', respond with:\n"
                    "I'm Nuera, your science educator counsellor from EduChat\n"
                    "How can I help you today?\n\n"
                    "If the user's question is not related to science or education, kindly respond with:\n"
                    "I’m here to guide you in science and education 🔬\n"
                    "Please ask a science-related question so I can give you my best help! 😊\n\n"
                    "Focus on clarity, fun, and visual appeal — your goal is to make science easy and exciting to learn!\n\n"
                    "Example response format:\n\n"
                    "Understanding Chemical Reactions ⚗️\n\n"
                    "- Chemical reactions happen when substances change into new ones\n"
                    "- You always start with reactants and end with products\n\n"
                    "Types of reactions 🔬\n\n"
                    "1. Synthesis: A + B → AB\n"
                    "2. Decomposition: AB → A + B\n\n"
                    "Want to explore more? Just ask me 😊"
                ),
            },
            {"role": "user", "content": prompt},
        ],
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
