from django.db import models

class MajorReq(models.Model):
    name = models.CharField(default='', max_length=100)
    description = models.TextField(default='' )
    prerequisite = models.CharField(default='', max_length=200)
    co_requisite = models.CharField(default='', max_length=200)
    credits = models.TextField(default='')
    CoreRequirement = models.TextField(default='')
    course_offered = models.CharField(default='', max_length=200)
    course_type = models.CharField(default='' , max_length=200)

    def __str__(self):
        return self.name
    