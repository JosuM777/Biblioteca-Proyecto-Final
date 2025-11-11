from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Usuario(AbstractUser):
    num_telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)


class Libro(models.Model):
    ELECCIONES_LIBRO = (
        ("prestado", "Prestado"),
        ("ventade", "Venta"),
        ("alquiler", "Alquiler"),
    )
    titulo = models.CharField(max_length=20)
    autor = models.CharField(max_length=50)
    isbn = models.CharField(max_length=13)
    disponible = models.BooleanField(default=True)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    eleccion_libro = models.CharField(max_length=10, choices=ELECCIONES_LIBRO, default="prestado")

    
    
class Alquiler(models.Model):
    usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro,on_delete=models.CASCADE)
    fecha_alquiler = models.DateField(auto_now_add=True)
