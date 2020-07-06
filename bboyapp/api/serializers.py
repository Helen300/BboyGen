from rest_framework import serializers
from bboyapp.models import Move, UserProfile 

# from JSON to model 
class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('username', 'email', 'moveList', 'setList', 'probs', 'durations')