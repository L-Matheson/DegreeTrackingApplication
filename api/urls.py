from django.urls import path
from api.views.testview import TestTableListCreateView, TestTableDeleteView
from api.views.studentView import get_students, create_student, student_details
from api.views.majorReq import  major_courses_details, create_major_course, get_major_courses
from api.views.enrolledCoursesView import get_all_enrolled_courses, enrolled_courses_details, enrolled_courses_by_semester, enrolled_courses_semester

urlpatterns = [
    path('students/', get_students, name='get-students'),
    path('student/create/', create_student, name='create-student'),
    path('student/<str:user>/<str:pas>', student_details, name='get-students'),
    path('courses/major/create', create_major_course, name='major_create_course'),
    path('courses/major/', get_major_courses, name='major_courses'),
    path('courses/enrolled/', enrolled_courses_details, name='enrolled_courses'),
    path('courses/enrolled/all', get_all_enrolled_courses, name='get_all_enrolled_courses'),
    path('courses/enrolled/all/<str:semester>/<str:direction>', enrolled_courses_by_semester, name='get_all_enrolled_courses_semester'),
    path('courses/enrolled/semester/<str:semester>/', enrolled_courses_semester, name='enrolled_courses_semester'),
    # Add other URL patterns here     
]