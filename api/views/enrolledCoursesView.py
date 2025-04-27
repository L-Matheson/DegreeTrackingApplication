from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.enrolledCourses import EnrolledCourses
from api.serializers.enrolledCoursesSerializer import enrolledCoursesSerializer
from rest_framework.decorators import api_view
import json

@api_view(['GET'])
def enrolled_courses_by_semester(request, semester, direction):
    try:
        # Validate the input semester format
        if " " not in semester:
            return Response(
                {"error": "Invalid semester format. Expected format: 'Season Year' (e.g., 'Fall 2026')."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        season_order = {"Winter": 1, "Spring": 2, "Summer": 3, "Fall": 4}
        # Format is "Fall 2026", so split by space
        # and convert the year to an integer to sort correctly
        input_season, input_year = semester.split(" ")
        input_year = int(input_year)
       
        enrolled_courses = EnrolledCourses.objects.all()

        filtered_courses = []
        for course in enrolled_courses:
            if " " not in course.semesterEnrolled:
                continue  

            course_season, course_year = course.semesterEnrolled.split(" ")
            course_year = int(course_year)

            if direction == "up":
                # Include courses on or after the input semester
                if course_year > input_year or (course_year == input_year and season_order[course_season] >= season_order[input_season]):
                    filtered_courses.append(course)
            else:
                # Include courses on or before the input semester
                if course_year < input_year or (course_year == input_year and season_order[course_season] <= season_order[input_season]):
                    filtered_courses.append(course)

        serializer = enrolledCoursesSerializer(filtered_courses, many=True)
        return Response(serializer.data)

    except ValueError:
        return Response(
            {"error": "Invalid semester format. Expected format: 'Season Year' (e.g., 'Fall 2026')."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def enrolled_courses_semester(request, semester):
    # gets student information that matches the primary key
    try:
        enrolledCourses = EnrolledCourses.objects.all()
        returned_courses = []
        for course in enrolledCourses:
            if course.semesterEnrolled == semester:
                returned_courses.append(course)
        # enrolledCourses = EnrolledCourses.objects.all(semesterEnrolled=semester)
    except EnrolledCourses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # serialize the student data and return it
    serializer = enrolledCoursesSerializer(returned_courses, many=True)
    return Response(serializer.data)

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