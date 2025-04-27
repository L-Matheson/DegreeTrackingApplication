from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.majorReq import MajorReq
from api.serializers.MajorReqSerializer import MajorReqSerializer
from rest_framework.decorators import api_view
import json



@api_view(['GET'])
def get_major_courses(request):
    majorReqCourses = MajorReq.objects.all()
    serializer = MajorReqSerializer(majorReqCourses, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def major_courses_details(request):
    try:
        majorReqCourses = MajorReq.objects.all()
    except MajorReq.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        serializer = MajorReqSerializer(majorReqCourses)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = MajorReqSerializer(majorReqCourses, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        majorReqCourses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def create_major_course(request):
    serializer = MajorReqSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
