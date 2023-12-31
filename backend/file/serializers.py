from django.db.models import Q
# REST Framework
from rest_framework import serializers
# Mine
from .models import File
from users.serializers import UserSerializer


class FileSerializer(serializers.ModelSerializer):
	uploaded_by_user = serializers.SerializerMethodField(read_only=True)
	file_size = serializers.SerializerMethodField(read_only=True)
	thumbnail_size = serializers.SerializerMethodField(read_only=True)
	date_added = serializers.SerializerMethodField(read_only=True)
	shared_with_users = serializers.SerializerMethodField(read_only=True)

	@staticmethod
	def get_file_size(obj):
		size = obj.file.size
		return size

	@staticmethod
	def get_date_added(obj):
		return obj.date_added.strftime("%b %d, %Y %I:%M%p")

	@staticmethod
	def get_thumbnail_size(obj):
		# print(obj.thumbnail)
		if obj.thumbnail != 'null':
			size = obj.thumbnail.size
			return size
		return 0

	@staticmethod
	def get_shared_with_users(obj):
		user = obj.shared_with
		serializer = UserSerializer(user, many=True)
		return serializer.data

	@staticmethod
	def get_uploaded_by_user(obj):
		user = obj.uploaded_by
		serializer = UserSerializer(user, many=False)
		return serializer.data

	class Meta:
		model = File
		fields = ['id', 'name', 'tags', 'file', 'file_size', 'thumbnail', 'thumbnail_size',
		          'uploaded', 'shared', 'starred', 'uploaded_by_user', 'shared_with_users',
		          'date_added']


class ShareFileSerializer(FileSerializer):
	class Meta:
		model = File
		fields = ['id', 'name', 'tags', 'file', 'file_size', 'thumbnail', 'thumbnail_size',
		          'uploaded', 'uploaded_by_user', 'shared', 'starred', 'date_added']
