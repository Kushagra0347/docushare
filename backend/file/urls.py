from django.urls import path
from file import views

urlpatterns = [
	path('add/', views.addFile, name='add-file'),
]
