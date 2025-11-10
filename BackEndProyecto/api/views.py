from django.shortcuts import render
from .serializers import UsuarioSerializer
from .models import Usuario
from rest_framework.generics import ListCreateAPIView

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    