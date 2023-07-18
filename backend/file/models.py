from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class File(models.Model):
	file = models.FileField(upload_to='files/', blank=False, null=False)
	thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
	name = models.CharField(max_length=200, blank=True, null=True)
	description = models.TextField(blank=True, null=True)
	tags = models.CharField(max_length=400, blank=False, null=False)

	users = models.ManyToManyField(User, blank=True)

	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name
