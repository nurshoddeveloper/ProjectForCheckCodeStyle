# Generated by Django 3.0.5 on 2022-08-12 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0013_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='client_number',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
