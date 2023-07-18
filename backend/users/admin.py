from django.contrib import admin
from users import models


# Register your models here.
@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
	list_display = ['email', 'first_name', 'last_name', 'dob', 'is_admin', 'is_superuser', 'is_active', 'date_joined']
