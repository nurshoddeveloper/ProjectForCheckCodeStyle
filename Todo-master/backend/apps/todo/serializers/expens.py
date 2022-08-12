from rest_framework import serializers
from todo.models import Expens
from core.utils.serializers import ValidatorSerializer


class ExpensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expens
        fields = ('id', 'title', 'is_number', 'todo',)


class ExpensFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    todo = serializers.IntegerField()
