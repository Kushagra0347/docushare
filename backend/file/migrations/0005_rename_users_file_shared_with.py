# Generated by Django 4.2.3 on 2023-07-28 02:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('file', '0004_file_starred'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='users',
            new_name='shared_with',
        ),
    ]
