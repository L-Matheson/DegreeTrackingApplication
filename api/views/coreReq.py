from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.coreReq import CoreReq
from api.serializers.CoreReqSerializer import CoreReqSerializer
from rest_framework.decorators import api_view
import json


   
@api_view(['POST'])
def populate_corereq(request):
    try:
        print('test')
        with open('cos_req.json', 'r') as file:
            data = json.load(file)
            print(data)
        for entry in data:
            serializer = CoreReqSerializer(data=entry)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "CoreReq table populated successfully."}, status=status.HTTP_201_CREATED)

    except FileNotFoundError:
        return Response({"error": "cos_req.json file not found."}, status=status.HTTP_404_NOT_FOUND)
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format in cos_req.json."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_core_courses(request):
    coreReqCourses = CoreReq.objects.all()
    serializer = CoreReqSerializer(coreReqCourses, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def core_courses_details(request):
    try:
        coreReqCourses = CoreReq.objects.all()
    except CoreReq.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        serializer = CoreReqSerializer(coreReqCourses)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CoreReqSerializer(coreReqCourses, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        coreReqCourses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def create_core_course(request):
    serializer = CoreReqSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
