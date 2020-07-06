from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class UserProfile(models.Model):
	username = models.CharField(max_length=50, primary_key=True)
	email = models.CharField(max_length=50)
	moveList = JSONField(null=True, blank=True, default=list())
	setList = JSONField(null=True, blank=True, default=list())
	probs = JSONField(null=True, blank=True, default=dict())
	durations = JSONField(null=True, blank=True, default=dict())

class Move(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
