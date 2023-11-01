from django.contrib.auth import get_user_model
# REST Framework
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'email', 'dob']


class RegisteredUserSerializer(serializers.ModelSerializer):
	token = serializers.SerializerMethodField(read_only=True)

	@staticmethod
	def get_token(obj):
		token = RefreshToken.for_user(obj)
		return str(token.access_token)

	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'email', 'dob', 'avatar', 'token']


class LoginSerializer(TokenObtainPairSerializer):
	def validate(self, attrs):
		data = super().validate(attrs)

		serialized_data = RegisteredUserSerializer(self.user).data

		for key, value in serialized_data.items():
			data[key] = value

		return data
