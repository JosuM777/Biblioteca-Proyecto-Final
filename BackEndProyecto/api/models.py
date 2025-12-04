from django.db import models
from django.contrib.auth.models import AbstractUser

# Usuario

class Usuario(AbstractUser):
    num_telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)
    foto_perfil = models.ImageField(
        upload_to="perfiles/", null=True, blank=True
    )

    ROLES = [
        ('admin', 'Administrador'),
        ('autor', 'Autor'),
        ('usuario', 'Usuario'),
    ]
    rol = models.CharField(max_length=20, choices=ROLES, default='usuario')

    def __str__(self):
        return self.username


# Libro

class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    autor_o_editorial = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    genero = models.CharField(max_length=100)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('disponible', 'Disponible'),
            ('alquilado', 'Alquilado'),
            ('vendido', 'Vendido'),
        ],
        default='disponible'
    )
    imagen = models.ImageField(upload_to='libros/', blank=True, null=True)

    creador = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="libros_creados",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.titulo


# Alquiler

class Alquiler(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_alquiler = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.libro.titulo}"


# Intercambio

class Intercambio(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Intercambio de {self.libro.titulo} por {self.usuario.username}"


# Vendido

class Vendido(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.libro.titulo} vendido a {self.usuario.email}"
    


class Compra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)