from rest_framework import serializers
from todo.models import Income
from core.utils.serializers import ValidatorSerializer


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'title', 'is_number', 'todo',)


class IncomeFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    todo = serializers.IntegerField()
