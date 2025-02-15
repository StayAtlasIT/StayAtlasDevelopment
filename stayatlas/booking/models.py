from django.db import models
from django.contrib.auth.models import User

class Property(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=12)
    location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=50)
    rooms = models.IntegerField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.location}"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_photos/')

    def __str__(self):
        return f"{self.property.first_name} {self.property.last_name}"

#class Meta:
    #verbose_name = "Property"
    #verbose_name_plural = "Properties"