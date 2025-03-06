from django.db import models

class MajorReq(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    prerequisite = models.CharField(max_length=100)
    co_requisite = models.CharField(max_length=100)
    course_offered = models.CharField(max_length=100)
    course_type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    