from rest_framework import serializers
from api.models.majorReq import MajorReq

class MajorReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = MajorReq
        fields = ['id', 'name', 'description', 'prerequisite','co_requisite','course_offered','course_type']
