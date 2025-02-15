from django.urls import path
from api.views.testview import TestTableListCreateView, TestTableDeleteView

urlpatterns = [
    path('test-table/', TestTableListCreateView.as_view(), name='test-table-list-create'),
    path('test-table/<int:pk>/', TestTableDeleteView.as_view(), name='test-table-delete'),
]