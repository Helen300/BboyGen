from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class UserProfile(models.Model):
	username = models.CharField(max_length=50)
	email = models.CharField(max_length=50)
	# to access userId in data table need to do "userId"
	userId= models.CharField(max_length=50, primary_key=True)
	moveList = JSONField(null=True, blank=True, default=list())
	setList = JSONField(null=True, blank=True, default=list())
	probs = JSONField(null=True, blank=True, default=dict())
	durations = JSONField(null=True, blank=True, default=dict())

