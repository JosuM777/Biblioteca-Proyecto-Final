from rest_framework.serializers import ModelSerializer
from .models import Usuario,Libro,Alquiler


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"
        
class LibroSerializer(ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'
class AlquilerSerializer(ModelSerializer):
    class Meta:
        model = Alquiler
        fields = '__all__'