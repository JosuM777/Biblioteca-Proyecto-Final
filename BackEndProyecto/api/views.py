from django.shortcuts import render
from .serializers import UsuarioSerializer,LibroSerializer,AlquilerSerializer
from .models import Usuario,Libro,Alquiler
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
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
        
        if Usuario.objects.filter(num_telefono=num_telefono).exists():
            return Response(
                {"error:El número de teléfono ya existe"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if Usuario.objects.filter(direccion=direccion).exists():
            return Response(
                {"error:La dirección ya existe"},
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
                {"error": "Credenciales Incorrectas"},
                status=status.HTTP_401_UNAUTHORIZED
            )

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class LibroListCreateView(ListCreateAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'genero']  # Puedes filtrar por estado o género
    search_fields = ['titulo', 'autor_o_editorial', 'descripcion']  # Búsqueda general
    ordering_fields = ['precio', 'titulo']

    def get_queryset(self):
        usuario_id = self.request.query_params.get("usuario")
        if usuario_id:
            return Libro.objects.filter(usuario_id=usuario_id)
        return Libro.objects.all()

    # Validaciones personalizadas al crear un libro
    def create(self, request, *args, **kwargs):
        data = request.data

        if not data.get('titulo'):
            return Response({'titulo': 'El título es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get('autor_o_editorial'):
            return Response({'autor_o_editorial': 'Debe indicar un autor o editorial.'}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get('precio') or float(data['precio']) <= 0:
            return Response({'precio': 'El precio debe ser mayor a 0.'}, status=status.HTTP_400_BAD_REQUEST)

        # Evitar duplicados (por título y autor/editorial)
        if Libro.objects.filter(
            titulo=data['titulo'],
            autor_o_editorial=data['autor_o_editorial']
        ).exists():
            return Response(
                {'error': 'Ya existe un libro con ese título y autor/editorial.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)



class LibroDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer

    # Evita eliminar libros alquilados o vendidos
    def destroy(self, request, *args, **kwargs):
        libro = self.get_object()
        if libro.estado in ['alquilado', 'vendido']:
            return Response(
                {"error": "No se puede eliminar un libro alquilado o vendido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().destroy(request, *args, **kwargs)
    


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

        if libro.estado == 'vendido':
            return Response({'error': 'El libro ya fue vendido.'}, status=status.HTTP_400_BAD_REQUEST)
        if libro.estado == 'alquilado':
            return Response({'error': 'El libro ya está alquilado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Cambiar el estado del libro automáticamente
        libro.estado = 'alquilado'
        libro.save()

        return super().create(request, *args, **kwargs)


class AlquilerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Alquiler.objects.all()
    serializer_class = AlquilerSerializer

    # Cuando se elimina un alquiler, el libro vuelve a estar disponible
    def perform_destroy(self, instance):
        libro = instance.libro
        libro.estado = 'disponible'
        libro.save()
        instance.delete()

class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer

    def perform_create(self, serializer):
        """ Guardar el creador automáticamente """
        usuario = self.request.user
        serializer.save(creador=usuario)
