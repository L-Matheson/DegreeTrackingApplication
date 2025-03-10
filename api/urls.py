from django.urls import path
from api.views.testview import TestTableListCreateView, TestTableDeleteView
from api.views.majorReq import MajorReqView
from api.views.studentView import check_student, register_user
urlpatterns = [
    path('test-table/', TestTableListCreateView.as_view(), name='test-table-list-create'),
    path('test-table/<int:pk>/', TestTableDeleteView.as_view(), name='test-table-delete'),
    path('majorReq/', MajorReqView.as_view(), name='major-req'),
    path('check_username/<str:username>/', check_student),
    path('register/', register_user),
]