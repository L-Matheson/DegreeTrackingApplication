from django.db import models

class Student(models.Model):
    username = models.CharField(max_length=150, unique=True, primary_key=True)
    password = models.CharField(max_length=256)  
    
    def __str__(self):
        return self.username

