from django.db import models

class MajorReq(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    prerequisite = models.CharField(max_length=200)
    co_requisite = models.CharField(max_length=200)
    credits = models.IntegerField()
    CoreRequirement = models.CharField()
    course_offered = models.TextField()
    course_type = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    