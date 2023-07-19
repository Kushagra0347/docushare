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

		file = File.objects.create(file=data['file'], thumbnail=data['thumbnail'], name=data['fileName'], uploaded=True,
		                           uploaded_by=user,
		                           tags=data['tags'])
		serializer = FileSerializer(file, many=False)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except Exception as e:
		message = {'detail': e.args[0]}
		return Response(message, status=status.HTTP_400_BAD_REQUEST)
