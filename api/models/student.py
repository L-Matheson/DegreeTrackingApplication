from django.db import models

class Student(models.Model):
    username = models.CharField(max_length=150, unique=True, primary_key=True)
    password = models.CharField(max_length=256)  
    firstName = models.CharField(max_length=30, default='')
    lastName = models.CharField(max_length=30, default='')
    studentEmail = models.CharField(max_length=254, unique=True, default='') # Can also be a .EmailField, but using CharField for flexibility

    
    def __str__(self):
        return self.username

# {
#  username : test2,
#     password: test, 
#     firstName : hello,
#     lastName:world,
#     studentEmail:  hellloo
# }

