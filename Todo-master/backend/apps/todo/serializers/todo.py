from rest_framework import serializers
from todo.models import Todo
from todo.serializers.income import IncomeSerializer
from todo.serializers.expens import ExpensSerializer


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'is_active', 'created_at',)


class TodoDetailSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['income'] = IncomeSerializer(instance.income.all(), many=True).data
        data['expens'] = ExpensSerializer(instance.expens.all(), many=True).data
        return data

    class Meta:
        model = Todo
        fields = ('id', 'title', 'is_active', 'created_at', 'income', 'expens')
