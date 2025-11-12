from django.shortcuts import render
from .serializers import UsuarioSerializer
from .models import Usuario
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        num_telefono = request.data.get("num_telefono")
        direccion = request.data.get("direccion")

        if Usuario.objects.filter(username=username).exists():
            return Response(
                {"error": "El nombre de usuario ya existe"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if Usuario.objects.filter(email=email).exists():
            return Response(
                {"error": "El correo ya existe"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        usuario = Usuario.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            num_telefono=num_telefono,
            direccion=direccion
        )
        usuario.save()

        return Response(
            {"message": "Usuario registrado exitosamente"},
            status=status.HTTP_201_CREATED
        )
            
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            serializer = UsuarioSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED
            )
