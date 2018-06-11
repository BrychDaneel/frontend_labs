from django.db import models

# Create your models here.

class People(models.Model):

    name = models.CharField(max_length=30)
    age = models.PositiveSmallIntegerField()
    weight = models.PositiveSmallIntegerField()
    height = models.PositiveSmallIntegerField()
    habits = models.TextField()
    sex = models.BooleanField()
