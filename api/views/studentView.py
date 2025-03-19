from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models.student import Student
from api.serializers.StudentSerializer import StudentSerializer

@api_view(['GET'])
def get_students(request):
    # .objects simply gets all the objects in the database, .all returns everything currently in the table
    students = Student.objects.all()
    # in the serializer, first param is the data to serialize, second param is whether or not to serialize multiple objects
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def student_details(request, pk):
    # gets student information that matches the primary key
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        # serialize the student data and return it
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
