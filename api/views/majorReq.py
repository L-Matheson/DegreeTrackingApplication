from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.majorReq import MajorReq
from api.serializers.MajorReqSerializer import MajorReqSerializer
from rest_framework.decorators import api_view

import json


   
@api_view(['POST'])
def populate_majorreq(request):
    try:
        print('test')
        with open('cos_req.json', 'r') as file:
            data = json.load(file)
            print(data)
        # Iterate through the JSON data and create MajorReq entries
        for entry in data:
            serializer = MajorReqSerializer(data=entry)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "MajorReq table populated successfully."}, status=status.HTTP_201_CREATED)

    except FileNotFoundError:
        return Response({"error": "cos_req.json file not found."}, status=status.HTTP_404_NOT_FOUND)
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format in cos_req.json."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_major_courses(request):
    majorReqCourses = MajorReq.objects.all()
    serializer = MajorReqSerializer(majorReqCourses, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def major_courses_details(request):
    try:
        majorReqCourses = MajorReq.objects.get() 
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
def create_student(request):
    serializer = MajorReqSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
