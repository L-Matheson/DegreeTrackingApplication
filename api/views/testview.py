from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.test import TestTable
from api.serializers.test_serializer import TestTableSerializer

class TestTableListCreateView(APIView):
    def get(self, request):
        records = TestTable.objects.all()
        serializer = TestTableSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestTableDeleteView(APIView):
    def delete(self, request, pk):
        try:
            record = TestTable.objects.get(pk=pk)
            record.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TestTable.DoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
