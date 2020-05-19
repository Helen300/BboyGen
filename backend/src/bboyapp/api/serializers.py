from rest_framework import serializers
from bboyapp.models import Move 

class MoveSerializer(serializers.ModelSerializer):
	class Meta:
		model = Move
		fields = ('name')