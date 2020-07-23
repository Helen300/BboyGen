from rest_framework import serializers
from bboyapp.models import UserProfile 

# from JSON to model 
class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('username', 'email', 'userId', 'moveList', 'setList', 'probs', 'durations')