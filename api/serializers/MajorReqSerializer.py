from rest_framework import serializers
from api.models.majorReq import MajorReq

class MajorReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = MajorReq
        fields = '__all__'
