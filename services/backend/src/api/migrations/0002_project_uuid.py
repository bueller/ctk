# Generated by Django 4.0.4 on 2022-06-22 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='uuid',
            field=models.CharField(blank=True, max_length=500, null=True, unique=True),
        ),
    ]