from django.urls import path
from file import views

urlpatterns = [
	path('add/', views.addFile, name='add-file'),
	path('all/<int:id>', views.getFilesUploadedByTheUser, name='get-files-uploaded-by-the-user'),
	path('get/<int:id>', views.getFile, name='get-file'),
	path('change/<int:id>', views.changeFile, name='change-file'),
	path('delete/', views.deleteFile, name='delete-file'),
	path('share/', views.shareFile, name='share-file'),
	path('download/<int:id>', views.downloadFile, name='download-file'),
]
