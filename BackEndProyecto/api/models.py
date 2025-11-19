from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Usuario(AbstractUser):
    num_telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)
    foto_perfil = models.ImageField(
        upload_to='fotos_perfil/', null=True, blank=True)


class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    autor_o_editorial = models.CharField(max_length=255)
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

    # usuario que creó el libro
    creador = models.ForeignKey(
        "Usuario",
        on_delete=models.CASCADE,
        related_name="libros_creados"
    )

    def __str__(self):
        return self.titulo


class Alquiler(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_alquiler = models.DateField(auto_now_add=True)
