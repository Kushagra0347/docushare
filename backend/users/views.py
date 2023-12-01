from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# Mine
from .serializers import RegisteredUserSerializer, LoginSerializer, UserSerializer

User = get_user_model()


# Create your views here.
class Login(TokenObtainPairView):
	serializer_class = LoginSerializer


@api_view(['POST'])
def signup(request):
	data = request.data

	try:
		user = User.objects.create(first_name=data['f_name'], email=data['email'], password=make_password(data['password']))
		serializer = RegisteredUserSerializer(user, many=False)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': 'User with this email already exists'}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editUser(request, id):
	data = request.data

	try:
		user = User.objects.get(id=id)

		if (data['f_name']):
			user.first_name = data['f_name']
		else:
			raise Exception('First Name is required')
		user.last_name = data['l_name']
		user.dob = data['dob']

		user.save()

		serializer = UserSerializer(user, many=False)
		print(serializer.data)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': f'Something went wrong -> {e.args}'}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
	try:
		user = User.objects.all()

		serializer = UserSerializer(user, many=True)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': f'Something went wrong -> {e.args}'}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)
