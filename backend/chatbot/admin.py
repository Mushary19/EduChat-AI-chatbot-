from django.contrib import admin

from chatbot.models.log import ChatLog
from chatbot.models.session import ChatSession

# Register your models here.
admin.site.register([ChatSession, ChatLog])
