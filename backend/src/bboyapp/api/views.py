from rest_framework.generics import ListAPIView, RetrieveAPIView
from bboyapp.models import Move 
from .serializers import MoveSerializer

class MoveListView(ListAPIView):
	queryset = Move.objects.all()
	serializer_class = MoveSerializer

class MoveDetailView(RetrieveAPIView):
	queryset = Move.objects.all()
	serializer_class = MoveSerializer
