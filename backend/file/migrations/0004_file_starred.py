# Generated by Django 4.2.3 on 2023-07-27 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file', '0003_alter_file_uploaded_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='starred',
            field=models.BooleanField(default=False),
        ),
    ]
