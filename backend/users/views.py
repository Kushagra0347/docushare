from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView

# Mine
from .serializers import UserTokenSerializer, LoginSerializer

User = get_user_model()


# Create your views here.
class Login(TokenObtainPairView):
	serializer_class = LoginSerializer


@api_view(['POST'])
def signup(request):
	data = request.data

	try:
		user = User.objects.create(first_name=data['f_name'], email=data['email'], password=make_password(data['password']))
		serializer = UserTokenSerializer(user, many=False)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': 'User with this email already exists'}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)
