from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Usuario(AbstractUser):
    num_telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)


class Libro(models.Model):
    titulo = models.CharField(max_length=20)
    
    
class Alquiler(models.Model):
    usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro,on_delete=models.CASCADE)
    fecha_alquiler = models.DateField(auto_now_add=True)
