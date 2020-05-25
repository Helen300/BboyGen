from bboyapp.api.views import MoveViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', MoveViewSet, basename='moves')
urlpatterns = router.urls


# from django.urls import path

# from .views import (
# 	MoveListView, 
# 	MoveDetailView,
# 	MoveCreateView,
# 	MoveUpdateView,
# 	MoveDeleteView,
# )


# urlpatterns = [
# 	path('', MoveListView.as_view()),
# 	path('create/', MoveCreateView.as_view()),
# 	path('<pk>', MoveDetailView.as_view()),
# 	path('<pk>/update/', MoveUpdateView.as_view()),
# 	path('<pk>/delete/', MoveDeleteView.as_view()),
# ]