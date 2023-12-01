from django.urls import path
from users import views

urlpatterns = [
	path('login/', views.Login.as_view(), name='login'),
	path('signup/', views.signup, name='signup'),
	path('edit/<id>/', views.editUser, name='edit-user'),
	path('all/', views.getUsers, name='all-users')
]
