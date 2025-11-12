from django.urls import path
from .views import UsuarioCreateView
from .views import RegisterView
from .views import RegisterView, LoginView
from .views import AlquilerListCreateView, AlquilerDetailView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
       path('alquileres/', AlquilerListCreateView.as_view(),
         name='alquiler-list-create'),
    path('alquileres/<int:pk>/', AlquilerDetailView.as_view(),
         name='alquiler-detail'),
]