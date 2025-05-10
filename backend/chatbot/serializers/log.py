from rest_framework import serializers

from chatbot.models.log import ChatLog


class ChatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatLog
        fields = "__all__"
