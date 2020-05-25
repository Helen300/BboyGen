from rest_framework import serializers
from bboyapp.models import Move 

# from JSON to model 
class MoveSerializer(serializers.ModelSerializer):
	class Meta:
		model = Move
		fields = ('id', 'name')