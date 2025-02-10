from rest_framework import serializers
from api.models import test

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = test
        fields = '__all__'
