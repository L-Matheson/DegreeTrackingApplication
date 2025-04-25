from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.enrolledCourses import EnrolledCourses
from api.serializers.enrolledCoursesSerializer import enrolledCoursesSerializer
from rest_framework.decorators import api_view
import json


@api_view(['GET'])
def get_all_enrolled_courses(request):
    enrolledCourses = EnrolledCourses.objects.all()
    serializer = enrolledCoursesSerializer(enrolledCourses, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def enrolled_courses_details(request):
    try:
        enrolledCourses = EnrolledCourses.objects.all()
    except EnrolledCourses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        serializer = enrolledCoursesSerializer(enrolledCourses)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = enrolledCoursesSerializer(enrolledCourses, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        enrolledCourses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = enrolledCoursesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)