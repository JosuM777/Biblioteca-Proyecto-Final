from rest_framework.serializers import ModelSerializer
from .models import Usuario,Libro,Alquiler
from rest_framework import serializers


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'num_telefono', 'direccion']
        extra_kwargs = {
            'num_telefono': {'write_only': True},
            'direccion': {'write_only': True},
            'password': {'write_only': True},
        }

    def to_representation(self, instance):
        """Muestra datos limitados si no es el mismo usuario"""
        representation = super().to_representation(instance)

        request = self.context.get('request')
        if request and request.user != instance:
            # Ocultar info privada a otros usuarios
            representation.pop('num_telefono', None)
            representation.pop('direccion', None)

        # Nunca mostrar la contraseña
        representation.pop('password', None)
        return representation
            
        
class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = "__all__"
        read_only_fields = ["creador"]
class AlquilerSerializer(ModelSerializer):
    class Meta:
        model = Alquiler
        fields = '__all__'