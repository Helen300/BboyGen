from rest_framework import viewsets
from rest_framework.response import Response

from bboyapp.models import Move 
from .serializers import MoveSerializer


class MoveViewSet(viewsets.ModelViewSet):
	queryset = Move.objects.all()
	serializer_class = MoveSerializer



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

