from django.db import models
from core.models import BaseModel
from todo.querysets.todo import TodoQuerySet
from todo.querysets.income import IncomeQuerySet
from todo.querysets.expens import ExpensQuerySet
from django.db.models import CASCADE


class Todo(BaseModel):
    title = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey('users.User', models.CASCADE)
    objects = TodoQuerySet.as_manager()

    class Meta:
        db_table = 'todo_todos'


class Project(BaseModel):
    director_name = models.CharField(max_length=255)
    income_month = models.CharField(max_length=255)
    client_number = models.IntegerField()
    salary = models.IntegerField()
    banner_number = models.IntegerField()
    project_name = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name='project')


class Expens(BaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    is_number = models.IntegerField(blank=True, null=True)
    todo = models.ForeignKey('todo.Todo', on_delete=models.CASCADE, related_name='expens')
    objects = ExpensQuerySet.as_manager()


class Income(BaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    is_number = models.IntegerField(blank=True, null=True)
    todo = models.ForeignKey('todo.Todo', on_delete=models.CASCADE, related_name='income')
    objects = IncomeQuerySet.as_manager()
