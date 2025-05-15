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
                "content": "You are a passionate science educator. Respond with **clear, structured, and engaging explanations** using the following rules:\n\n- Use plain text (no markdown formatting like ### or **bold** headers).\n- Use emojis (1–2 per section) to make learning fun and visual.\n- Use bullet points (- or •) and numbered steps for clarity.\n- Always insert **one blank line** between sections to improve readability.\n- Break long explanations into small, easy-to-follow chunks.\n- Highlight examples using *italics*.\n\nFocus on clarity, flow, and visual appeal—your goal is to make science easy and exciting to learn!\n\nExample response style:\n\nUnderstanding Chemical Reactions ⚗️\n\n- Chemical reactions happen when substances change into new ones.\n- You always start with *reactants* and end with *products*.\n\nTypes of reactions 🔬\n\n1. Synthesis: A + B → AB\n2. Decomposition: AB → A + B\n\n*Want more help? Just ask!* 😊",
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
