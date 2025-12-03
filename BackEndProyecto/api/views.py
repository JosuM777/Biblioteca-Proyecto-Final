from django.shortcuts import render
from .serializers import (
    UsuarioSerializer, LibroSerializer, AlquilerSerializer,
    VendidoSerializer, IntercambioSerializer, CompraItemSerializer
)
from .models import Usuario, Libro, Alquiler, Vendido, Intercambio, Compra
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import get_user_model, authenticate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.parsers import MultiPartParser, FormParser

User = get_user_model()

# Usuarios


class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    parser_classes = [MultiPartParser, FormParser]


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
            return Response({"error": "El nombre de usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)
        if Usuario.objects.filter(email=email).exists():
            return Response({"error": "El correo ya existe"}, status=status.HTTP_400_BAD_REQUEST)
        if Usuario.objects.filter(num_telefono=num_telefono).exists():
            return Response({"error": "El número de teléfono ya existe"}, status=status.HTTP_400_BAD_REQUEST)
        if Usuario.objects.filter(direccion=direccion).exists():
            return Response({"error": "La dirección ya existe"}, status=status.HTTP_400_BAD_REQUEST)

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

        return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            serializer = UsuarioSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales Incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)


# Libros

class LibroListCreateView(ListCreateAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'genero']
    ordering_fields = ['precio', 'titulo']

    def get_queryset(self):
        usuario_id = self.request.query_params.get("usuario")
        if usuario_id:
            return Libro.objects.filter(usuario_id=usuario_id)
        return Libro.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data

        if not data.get('titulo'):
            return Response({'titulo': 'El título es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            precio = float(data.get('precio', 0))
            if precio <= 0:
                return Response({'precio': 'El precio debe ser mayor a 0.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'precio': 'El precio debe ser un número válido.'}, status=status.HTTP_400_BAD_REQUEST)

        if Libro.objects.filter(
            titulo=data['titulo'],
            autor_o_editorial=data.get('autor_o_editorial')
        ).exists():
            return Response({'error': 'Ya existe un libro con ese título y autor/editorial.'}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class LibroDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    # ← añadido para soportar imágenes
    parser_classes = [MultiPartParser, FormParser]

    def destroy(self, request, *args, **kwargs):
        libro = self.get_object()
        if libro.estado in ['alquilado', 'vendido']:
            return Response({"error": "No se puede eliminar un libro alquilado o vendido."},
                            status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)


# livhro por id
class LibroByIdView(ListCreateAPIView):
    serializer_class = LibroSerializer

    def get_queryset(self):
        libro_id = self.kwargs["id"]
        if libro_id:
            return Libro.objects.filter(id=libro_id)
        return Libro.objects.all()


# Alquileres

class AlquilerListCreateView(ListCreateAPIView):
    queryset = Alquiler.objects.all()
    serializer_class = AlquilerSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        libro_id = data.get('libro')

        if not libro_id:
            return Response({'libro': 'Debe seleccionar un libro.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            libro = Libro.objects.get(id=libro_id)
        except Libro.DoesNotExist:
            return Response({'error': 'El libro no existe.'}, status=status.HTTP_404_NOT_FOUND)

        if libro.estado in ['vendido', 'alquilado']:
            return Response({'error': f'El libro ya está {libro.estado}.'}, status=status.HTTP_400_BAD_REQUEST)

        libro.estado = 'alquilado'
        libro.save()

        return super().create(request, *args, **kwargs)


class AlquilerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Alquiler.objects.all()
    serializer_class = AlquilerSerializer

    def perform_destroy(self, instance):
        libro = instance.libro
        libro.estado = 'disponible'
        libro.save()
        instance.delete()


# Extra

class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer

    def perform_create(self, serializer):
        usuario = self.request.user
        serializer.save(creador=usuario)


class VendidoListCreateView(ListCreateAPIView):
    queryset = Vendido.objects.all()
    serializer_class = VendidoSerializer


class IntercambioListCreateView(ListCreateAPIView):
    queryset = Intercambio.objects.all()
    serializer_class = IntercambioSerializer


class LibrosVendidosView(APIView):
    def get(self, request):
        return Response({"vendidos": Vendido.objects.count()})


class LibrosAlquiladosView(APIView):
    def get(self, request):
        return Response({"alquilados": Alquiler.objects.count()})


class LibrosIntercambiadosView(APIView):
    def get(self, request):
        return Response({"intercambiados": Intercambio.objects.count()})
    

class CompraCreateView(ListCreateAPIView):
    queryset = Compra.objects.all()
    serializer_class = CompraItemSerializer

