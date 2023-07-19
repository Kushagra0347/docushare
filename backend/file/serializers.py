# REST Framework
from rest_framework import serializers
# Mine
from .models import File
from users.serializers import UserSerializer


class FileSerializer(serializers.ModelSerializer):
	uploaded_by_user = serializers.SerializerMethodField(read_only=True)

	@staticmethod
	def get_uploaded_by_user(obj):
		user = obj.uploaded_by
		serializer = UserSerializer(user, many=False)
		return serializer.data

	class Meta:
		model = File
		fields = ['id', 'name', 'file', 'thumbnail', 'uploaded', 'uploaded_by_user', 'shared', 'date_added']
