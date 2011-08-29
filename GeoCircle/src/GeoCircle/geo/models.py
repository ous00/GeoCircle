from django.db import models

# Create your models here.
class Circle(models.Model):
    name    = models.CharField(max_length=100)
    created_date = models.DateTimeField('date created')
    
    def __unicode__(self):
        return self.name

#class User(models.Model):
#    circle = models.ForeignKey(Circle)
#    name    = models.CharField(max_length=50)
#    latitude = models.IntegerField()
#    longitude = models.IntegerField()
    
    