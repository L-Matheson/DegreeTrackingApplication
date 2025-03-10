from django.http import JsonResponse
from api.models.student import User
import json
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

def check_student(request, username):
    exists = User.objects.filter(username=username).exists()
    if exists:
        return JsonResponse({'exists': True})
    else:
        return JsonResponse({"User Doesn't Exist": False})
    
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Username and password required.'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already taken.'}, status=400)

            # Save hashed password
            hashed_password = make_password(password)
            User.objects.create(username=username, password=hashed_password)

            return JsonResponse({'message': 'User registered successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)