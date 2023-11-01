from django.contrib.auth import get_user_model
from django.db.models import Q
from django.core.files import File as DjangoFile
from django.conf import settings
from django.http import HttpResponse, FileResponse
# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Mine
from .models import File
from .serializers import FileSerializer, ShareFileSerializer

User = get_user_model()


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
	sortBy = int(request.GET.get('sortBy'))

	try:
		if (id == 0):  # My cloud Files
			file_obj = File.objects.filter(uploaded_by=user, uploaded=True)

		elif (id == 1):  # Shared Files
			file_obj = File.objects.filter(shared_with=user)

		elif (id == 2):  # All Files
			file_obj = File.objects.filter(Q(uploaded_by=user) | Q(shared_with=user)).distinct()

		elif (id == 3):  # Starred Files
			file_obj = File.objects.filter(Q(uploaded_by=user) | Q(shared_with=user), starred=True).distinct()

		else:
			raise Exception('Invalid Type of id provided in the api')

		if sortBy == 0:  # Sort Alphabetically
			ordered_file_obj = file_obj.order_by('name')
		else:  # Sort by Date Added
			ordered_file_obj = file_obj.order_by('-date_added')

		if id == 1:
			serializer = ShareFileSerializer(ordered_file_obj, many=True)
		else:
			serializer = FileSerializer(ordered_file_obj, many=True)

		all_file_obj = File.objects.filter(Q(uploaded_by=user) | Q(shared_with=user)).distinct()
		all_file_serializer = FileSerializer(all_file_obj, many=True)

		DATA_LIST = [serializer.data, all_file_serializer.data]

		return Response(DATA_LIST, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args}
		print(message)
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
def changeFile(request, id):
	data = request.data
	print()
	try:
		file_obj = File.objects.get(id=id)
		val = file_obj.starred
		file_obj.starred = not val

		file_obj.save()

		serializer = FileSerializer(file_obj, many=False)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args}
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
		message = {'detail': e.args}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def shareFile(request):
	data = request.data
	file_id = data['file_id']
	try:
		file_obj = File.objects.get(id=file_id)
		file_obj.shared = True
		file_obj.save()

		for user in data['usersList']:
			user_obj = User.objects.get(email=user['email'])
			file_obj.shared_with.add(user_obj)

		serializer = FileSerializer(file_obj, many=False)

		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args}
		print(message)
		return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def downloadFile(request, id):
	try:
		file_obj = File.objects.get(id=id)
		file_path = file_obj.file.path
		# file_path = settings.MEDIA_ROOT + '/' + file_obj.file.name

		f = open(file_path, 'rb')

		file = DjangoFile(f)

		response = FileResponse(file)
		response['Content-Disposition'] = f'attachment; filename={file_obj.file.name}'

		return response
	except Exception as e:
		message = {'detail': e.args}
		print(message)
		return Response(message, status=status.HTTP_400_BAD_REQUEST)
