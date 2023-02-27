# Generated by Django 4.0.6 on 2023-02-27 10:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_pydantic_field._migration_serializers
import django_pydantic_field.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('test', '0004_rename_question_list_test_questions_test_description_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestSolution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answers', django_pydantic_field.fields.PydanticSchemaField(config=None, default=[], schema=django_pydantic_field._migration_serializers.GenericContainer(list, (str,)))),
                ('score', models.IntegerField()),
                ('status', models.CharField(choices=[('await', 'AWAIT VERIFICATION'), ('verified', 'VERIFIED')], default='AWAIT VERIFICATION', max_length=30)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_solutions', to=settings.AUTH_USER_MODEL)),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_solutions', to='test.test')),
            ],
        ),
    ]
