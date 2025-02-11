from rest_framework import serializers
from api.models.test import TestTable

class TestTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestTable
        fields = '__all__'