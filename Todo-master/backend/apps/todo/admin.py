from django.contrib import admin
from todo.models import Todo, Income, Expens, Project


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'user',)
    fields = ('title', 'is_active', 'user',)


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_number', 'todo',)
    fields = ('title', 'is_number', 'todo',)


@admin.register(Expens)
class ExpensAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_number', 'todo',)
    fields = ('title', 'is_number', 'todo',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('director_name', 'income_month', 'client_number', 'salary', 'banner_number', 'project_name',)
    fields = ('director_name', 'income_month', 'client_number', 'salary', 'banner_number', 'project_name',)
