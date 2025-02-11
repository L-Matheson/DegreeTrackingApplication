from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.test import TestTable
from api.serializers.test_serializer import TestTableSerializer

class TestTableListView(APIView):
    def get(self, request):
        # Import models inside the method to avoid circular imports
        from api.models.test import TestTable
        records = TestTable.objects.all()
        serializer = TestTableSerializer(records, many=True)
        return Response(serializer.data)
    

class TestTableListCreateView(APIView):
    def get(self, request):
        # Import models within the function to avoid early app loading
        from api.models import TestTable
        records = TestTable.objects.all()
        serializer = TestTableSerializer(records, many=True)
        return Response(serializer.data)


# DELETE an entry
class TestTableDeleteView(APIView):
    def delete(self, request, pk):
        try:
            record = TestTable.objects.get(pk=pk)
            record.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TestTable.DoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
