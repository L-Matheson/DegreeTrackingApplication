from django.db import models

class EnrolledCourses(models.Model):
    name = models.CharField(default='', max_length=100)
    progress = models.CharField(default='', max_length=100)
    semesterEnrolled = models.CharField(default='', max_length=100)
    gpa = models.CharField(default='In Progress', max_length=10)

    def __str__(self):
        return self.name
    