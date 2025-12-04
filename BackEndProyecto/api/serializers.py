from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Usuario, Libro, Alquiler, Intercambio, Vendido, Compra


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'rol', 'num_telefono', 'direccion', 'password', 'foto_perfil'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': False
            }
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class LibroSerializer(ModelSerializer):
    class Meta:
        model = Libro
        fields = "__all__"


class AlquilerSerializer(ModelSerializer):
    class Meta:
        model = Alquiler
        fields = "__all__"


class VendidoSerializer(ModelSerializer):
    class Meta:
        model = Vendido
        fields = "__all__"


class IntercambioSerializer(ModelSerializer):
    class Meta:
        model = Intercambio
        fields = "__all__"
        read_only_fields = ["usuario_intercambia"]


class LibroMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ["id", "titulo", "autor_o_editorial", "precio", "imagen", ""]


class CompraItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = "__all__"
