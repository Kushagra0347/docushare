import os

from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


# Create your models here.


def file_path(instance, filename):
	return f'files/{instance.uploaded_by.email}/{filename}'


def thumbnail_file_path(instance, filename):
	return f'thumbnail/{instance.uploaded_by.email}/{instance.name}_{filename}'


class File(models.Model):
	file = models.FileField(upload_to=file_path, unique=True, blank=False, null=False)
	thumbnail = models.ImageField(upload_to=thumbnail_file_path, null=True, blank=True)
	name = models.CharField(max_length=200, blank=True, null=True)
	tags = models.CharField(max_length=400, blank=False, null=False)

	uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='file_uploaded_by_user')
	shared_with = models.ManyToManyField(User, blank=True)

	uploaded = models.BooleanField(default=False)
	shared = models.BooleanField(default=False)
	starred = models.BooleanField(default=False)

	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

	def delete(self, using=None, keep_parents=False):
		super().delete()

		os.remove(os.path.join(settings.MEDIA_ROOT, self.file.name))
		if self.thumbnail != 'null':
			os.remove(os.path.join(settings.MEDIA_ROOT, self.thumbnail.name))
