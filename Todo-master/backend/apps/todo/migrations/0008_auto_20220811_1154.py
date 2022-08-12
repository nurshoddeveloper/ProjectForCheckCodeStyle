# Generated by Django 3.0.5 on 2022-08-11 11:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0007_auto_20220811_1108'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='expens',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='income',
        ),
        migrations.AddField(
            model_name='expens',
            name='todo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='expens', to='todo.Todo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='income',
            name='todo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='income', to='todo.Todo'),
            preserve_default=False,
        ),
    ]