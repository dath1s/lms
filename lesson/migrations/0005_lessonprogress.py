# Generated by Django 3.1.3 on 2021-02-02 13:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lesson', '0004_auto_20210111_0742'),
    ]

    operations = [
        migrations.CreateModel(
            name='LessonProgress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solved', models.JSONField(null=True)),
                ('lesson',
                 models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='progress',
                                   to='lesson.lesson')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                           to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('lesson', 'user')},
            },
        ),
    ]
