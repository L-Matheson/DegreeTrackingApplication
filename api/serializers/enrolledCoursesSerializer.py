from rest_framework import serializers
from api.models.enrolledCourses import EnrolledCourses

class enrolledCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrolledCourses
        fields = '__all__'
