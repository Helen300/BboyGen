from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class UserProfile(models.Model):
	username = models.CharField(max_length=32),
	email = models.CharField(max_length=32), 
	moves_list = JSONField(null=True, blank=True)

class Move(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
