from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.
class UserManager(BaseUserManager):
	use_in_migration = True

	def create_user(self, email, password=None, **kwargs):
		if not email:
			raise ValueError('Please provide an email address')

		user = self.model(email=self.normalize_email(email), **kwargs)
		user.set_password(password)
		user.save()

		return user

	def create_superuser(self, email, password=None, **kwargs):
		kwargs.setdefault('is_superuser', True)
		kwargs.setdefault('is_admin', True)
		kwargs.setdefault('is_staff', True)
		kwargs.setdefault('is_active', True)

		if not kwargs.get('is_staff'):
			raise ValueError('is_staff must be True')
		if not kwargs.get('is_superuser'):
			raise ValueError('is_superuser must be True')

		return self.create_user(email, password, **kwargs)


class User(AbstractUser):
	username = None
	email = models.EmailField(max_length=200, unique=True, null=False, blank=False)
	first_name = models.CharField(max_length=100, blank=True, null=True)
	last_name = models.CharField(max_length=100, blank=True, null=True)
	avatar = models.ImageField(upload_to='users/')

	date_joined = models.DateTimeField(auto_now_add=True)
	dob = models.DateField(blank=True, null=True)

	is_admin = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)

	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	def __str__(self):
		return self.email
