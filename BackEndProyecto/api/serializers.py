from rest_framework.serializers import ModelSerializer
from .models import Usuario, Libro, Alquiler


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name','rol',
                  'last_name', 'num_telefono', 'direccion', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
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
        read_only_fields = ["creador"]


class AlquilerSerializer(ModelSerializer):
    class Meta:
        model = Alquiler
        fields = '__all__'
