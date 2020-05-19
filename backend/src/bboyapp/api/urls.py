from django.urls import path

from .views import MoveListView, MoveDetailView


urlpatterns = [
	path('', MoveListView.as_view()),
	path('<pk>', MoveDetailView.as_view()),
]