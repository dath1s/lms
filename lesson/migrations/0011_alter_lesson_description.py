# Generated by Django 4.0.6 on 2023-03-13 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0010_attachment_file_format'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
