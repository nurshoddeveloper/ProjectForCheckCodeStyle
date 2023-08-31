from django.db import models

from todo.querysets.todo import TodoQuerySet


class Todo(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    merchant = models.CharField(max_length=255)

    attributes = models.JSONField()
    image_url = models.URLField(max_length=1024)
    image_width = models.PositiveIntegerField()
    image_height = models.PositiveIntegerField()
    objects = TodoQuerySet.as_manager()

    class Meta:
        db_table = 'todo_todos'
