from rest_framework import serializers
from api.models.coreReq import CoreReq

class CoreReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreReq
        fields = '__all__'
