from django.contrib import admin
from .models import File


# Register your models here.
@admin.register(File)
class FileAdmin(admin.ModelAdmin):
	list_display = ['tags', 'name', 'file', 'uploaded', 'shared', 'date_added']