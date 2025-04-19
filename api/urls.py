from django.urls import path
from api.views.testview import TestTableListCreateView, TestTableDeleteView
from api.views.studentView import get_students, create_student, student_details
from api.views.majorReq import populate_majorreq, major_courses_details

urlpatterns = [
    path('test-table/', TestTableListCreateView.as_view(), name='test-table-list-create'),
    path('test-table/<int:pk>/', TestTableDeleteView.as_view(), name='test-table-delete'),
    path('students/', get_students, name='get-students'),
    path('student/create/', create_student, name='create-student'),
    path('student/<str:user>/<str:pas>', student_details, name='get-students'),
    path('courses/major/populate', populate_majorreq, name='populate-majorreq'),
    path('courses/major/', major_courses_details, name='major_courses_details'),
    # Add other URL patterns here     
]