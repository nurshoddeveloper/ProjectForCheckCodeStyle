from django.urls import path
from todo.views.todo import TodoListView, TodoDetailView
from todo.views.project import ProjectListView, ProjectDetailView
from todo.views.income import IncomeListView, IncomeDetailView
from todo.views.expens import ExpensListView, ExpensDetailView

urlpatterns = [
    path('project', ProjectListView.as_view(), name='todo-list'),
    path('project/<int:pk>', ProjectDetailView.as_view(), name='todo-detail'),
    path('todo', TodoListView.as_view(), name='todo-list'),
    path('todo/<int:pk>', TodoDetailView.as_view(), name='todo-detail'),
    path('income', IncomeListView.as_view(), name='todo-list'),
    path('income/<int:pk>', IncomeDetailView.as_view(), name='todo-detail'),
    path('expens', ExpensListView.as_view(), name='todo-list'),
    path('expens/<int:pk>', ExpensDetailView.as_view(), name='todo-detail'),
]
