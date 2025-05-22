prompt = ""

from backend.chatbot.models.log import ChatLog, ChatSender
import spacy

nlp = spacy.load("en_core_web_sm")


doc = nlp(prompt)

entities = [(ent.text, ent.label_) for ent in doc.ents]

lemmas = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]

intent = (
    "ask_science_question"
    if "why" in prompt.lower() or "how" in prompt.lower()
    else "general_chat"
)

print("Entities:", entities)
print("Lemmas:", lemmas)
print("Intent:", intent)


import random


def small_talk(prompt, session):
    small_talk_responses = {
        "good morning": [
            "Good morning! ☀️ I hope your day starts with curiosity and smiles!",
            "Morning sunshine! 🌞 Ready to explore something cool in science?",
            "Wishing you a bright and inspiring morning! 😊 Let’s learn something new!",
        ],
        "good evening": [
            "Good evening! 🌙 I hope you had a lovely day — let’s wind down with some fun science!",
            "Evening vibes! ✨ Ready to relax and explore the wonders of the universe?",
            "Hello and good evening! 😊 Let me know what you'd like to learn tonight!",
        ],
        "thank you": [
            "You're so welcome! 😊 I'm always here to help!",
            "Anytime! 💖 Learning is a journey and I’m glad to be part of yours!",
            "Glad I could help! 🌟 Do you want to explore something else?",
        ],
        "thanks": [
            "You're welcome! 😊 Let me know if you'd like to learn something else!",
            "My pleasure! 🌼 Science is more fun together!",
            "No problem at all! 🌟 I'm here anytime you need help!",
        ],
    }

    normalized_prompt = prompt.lower()

    for phrase, replies in small_talk_responses.items():
        if phrase in normalized_prompt:
            reply = random.choice(replies)
            ChatLog.objects.create(
                session=session, sender=ChatSender.USER, message=prompt
            )
            ChatLog.objects.create(
                session=session, sender=ChatSender.SYSTEM, message=reply
            )
            return reply
