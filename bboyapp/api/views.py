from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from bboyapp.models import Move, UserProfile
from .serializers import MoveSerializer, UserProfileSerializer


class MoveViewSet(viewsets.ModelViewSet):
	queryset = Move.objects.all()
	serializer_class = MoveSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer

	@action(methods=['post'], detail=True, url_path='updateMoves', url_name='updateMoves')
	def updateMoves(self, request, *args, **kwargs):
		print("$$$$")
		print(request.data)
		print("$$$$MOVES")
		currentUser = UserProfile.objects.get(pk=request.data.get("username"))
		currentUser.moveList = request.data.get("moveList")
		currentUser.save()
		return Response()

	@action(methods=['post'], detail=True, url_path='updateSets', url_name='updateSets')
	def updateSets(self, request, *args, **kwargs): 
		print("####")
		print(request.data)
		print("####SETS")
		currentUser = UserProfile.objects.get(pk=request.data.get("username"))
		currentUser.setList = request.data.get("setList")
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

