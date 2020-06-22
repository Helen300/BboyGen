from rest_framework import serializers
from bboyapp.models import Move, UserProfile 
from rest_auth.registration.serializers import RegisterSerializer

# from JSON to model 
class MoveSerializer(serializers.ModelSerializer):
	class Meta:
		model = Move
		fields = ('name', 'description')

# from JSON to model 
class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('username', 'email', 'moveList', 'setList', 'probs')

