from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.majorReq import MajorReq
from api.serializers.MajorReqSerializer import MajorReqSerializer
import json


class MajorReqView(APIView):
    def get(self, request):
        records = MajorReq.objects.all()
        serializer = MajorReqSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MajorReqSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def populate(self, request):

        f = open('cos_req.json')

        data = json.load(f)
        for i in data['name']:
            print(i)

        f.close()

        # serializer = MajorReqSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MajorReqDeleteView(APIView):
    def delete(self, request, pk):
        try:
            record = MajorReq.objects.get(pk=pk)
            record.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MajorReq.DoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
