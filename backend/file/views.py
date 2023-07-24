from django.contrib.auth import get_user_model
# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Mine
from .models import File
from .serializers import FileSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFile(request):
	data = request.data
	user = request.user

	try:
		file_name = str(data['file']).replace(' ', '_')
		path = str(user.email) + '/' + file_name

		file_exists = File.objects.filter(file=path).exists()

		if file_exists:
			raise FileExistsError('File already exists')

		if data['fileName'] == '':
			data['fileName'] = data['file'].name

		file = File.objects.create(file=data['file'], thumbnail=data['thumbnail'], name=data['fileName'], uploaded=True,
		                           uploaded_by=user,
		                           tags=data['tags'])
		serializer = FileSerializer(file, many=False)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
# id = 0 -> My Cloud Files => uploaded = true, shared = false files
# id = 1 -> Shared Files => shared = true, uploaded = false files
# id = 2 -> All Files => uploaded = true, shared = true files
def getFilesUploadedByTheUser(request, id):
	user = request.user
	sortBy = request.GET.get('sortBy')

	try:
		if (id == 0):
			file_obj = File.objects.filter(uploaded_by=user, shared=False, uploaded=True)
		elif (id == 1):
			file_obj = File.objects.filter(uploaded_by=user, shared=True, uploaded=False)
		elif (id == 2):
			file_obj = File.objects.filter(uploaded_by=user)
		else:
			raise Exception('Invalid Type of id provided in the api')

		if sortBy == 0:
			file_obj.order_by('name')
		else:
			file_obj.order_by('date_added')

		serializer = FileSerializer(file_obj, many=True)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllFilesUploadedByTheUser(request):
	user = request.user
	sortBy = request.GET.get('sortBy')

	try:
		if sortBy == 0:
			file_obj = File.objects.filter(uploaded_by=user).order_by('name')
		else:
			file_obj = File.objects.filter(uploaded_by=user).order_by('date_added')

		serializer = FileSerializer(file_obj, many=True)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFile(request, id):
	try:
		file_obj = File.objects.get(id=id)

		serializer = FileSerializer(file_obj, many=False)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def deleteFile(request):
	data = request.data
	try:
		file_obj = File.objects.get(id=int(data['id']))
		file_obj.delete()

		return Response({'message': 'File deleted'}, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		print(message)
		return Response(message, status=status.HTTP_400_BAD_REQUEST)
