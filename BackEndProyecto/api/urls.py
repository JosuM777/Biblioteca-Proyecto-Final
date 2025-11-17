from django.urls import path
from .views import UsuarioCreateView
from .views import RegisterView
from .views import RegisterView, LoginView
from .views import AlquilerListCreateView, AlquilerDetailView, LibroListCreateView
from .views import UsuarioCreateView, UsuarioDetailView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path("login/", LoginView.as_view(), name="login"),
    path('alquileres/', AlquilerListCreateView.as_view(),
         name='alquiler-list-create'),
    path('alquileres/<int:pk>/', AlquilerDetailView.as_view(),
         name='alquiler-detail'),
    path('libros/', LibroListCreateView.as_view(), name='libros'),
    path('usuarios/', UsuarioCreateView.as_view(), name='usuario-list'),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view(),
         name='usuario-detail'),  # ✅ Aquí
]
