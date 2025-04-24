from rest_framework import serializers
from api.models.student import Student

class StudentSerializer(serializers.ModelSerializer):
    # What kind of fields to include in the serialized output
    class Meta:
        model = Student
        fields = '__all__'
        # fields = ['username', 'password']  # Example of specifying fields explicitly
        