from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from bboyapp.models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer

	@action(methods=['post'], detail=True, url_path='updateMoves', url_name='updateMoves')
	def updateMoves(self, request, *args, **kwargs):
		currentUser = UserProfile.objects.get(pk=request.data.get("userId"))
		currentUser.moveList = request.data.get("moveList")
		currentUser.save()
		return Response()

	@action(methods=['post'], detail=True, url_path='updateSets', url_name='updateSets')
	def updateSets(self, request, *args, **kwargs): 
		currentUser = UserProfile.objects.get(pk=request.data.get("userId"))
		currentUser.setList = request.data.get("setList")
		currentUser.save()
		return Response()

	@action(methods=['post'], detail=True, url_path='updateProbabilities', url_name='updateProbabilities')
	def updateProbabilities(self, request, *args, **kwargs): 
		currentUser = UserProfile.objects.get(pk=request.data.get("userId"))
		currentUser.probs = request.data.get("probs")
		currentUser.save()
		return Response()

	@action(methods=['post'], detail=True, url_path='updateDurations', url_name='updateDurations')
	def updateDurations(self, request, *args, **kwargs): 
		currentUser = UserProfile.objects.get(pk=request.data.get("userId"))
		currentUser.durations = request.data.get("durations")
		currentUser.save()
		return Response()

		
# from rest_framework.generics import (
# 	ListAPIView, 
# 	RetrieveAPIView, 
# 	CreateAPIView,
# 	DestroyAPIView,
# 	UpdateAPIView,
# )



# class MoveListView(ListAPIView):
# 	queryset = Move.objects.all()
# 	serializer_class = MoveSerializer

# class MoveDetailView(RetrieveAPIView):
# 	queryset = Move.objects.all()
# 	serializer_class = MoveSerializer


# class MoveCreateView(CreateAPIView):
# 	queryset = Move.objects.all()
# 	serializer_class = MoveSerializer


# class MoveUpdateView(UpdateAPIView):
# 	queryset = Move.objects.all()
# 	serializer_class = MoveSerializer


# class MoveDeleteView(DestroyAPIView):
# 	queryset = Move.objects.all()
# 	serializer_class = MoveSerializer

