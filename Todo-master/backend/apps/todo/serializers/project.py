from rest_framework import serializers
from todo.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'director_name', 'income_month', 'client_number', 'salary', 'banner_number', 'project_name')
