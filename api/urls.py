from django.urls import path
from api.views.testview import TestTableListCreateView, TestTableDeleteView
from api.views.studentView import get_students, create_student, student_details
from api.views.majorReq import  major_courses_details, create_major_course, get_major_courses
from api.views.coreReq import  core_courses_details, create_core_course, get_core_courses
from api.views.enrolledCoursesView import get_all_enrolled_courses, enrolled_courses_details

urlpatterns = [
    path('students/', get_students, name='get-students'),
    path('student/create/', create_student, name='create-student'),
    path('student/<str:user>/<str:pas>', student_details, name='get-students'),
    path('courses/major/create', create_major_course, name='create_major_course'),
    path('courses/major/', get_major_courses, name='major_courses'),
    path('courses/core/create', create_core_course, name='create__core_course'),
    path('courses/core/', get_core_courses, name='core_courses'),
    path('courses/enrolled/', enrolled_courses_details, name='enrolled_courses'),
    # Add other URL patterns here     
]