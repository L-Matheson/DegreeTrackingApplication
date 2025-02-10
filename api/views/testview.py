from rest_framework import generics
from api.models.test import Person
from api.serializers.test_serializer import PersonSerializer

class PersonListView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer