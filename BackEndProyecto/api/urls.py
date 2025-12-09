from django.urls import path
from .views import (
    RegisterView, LoginView,
    AlquilerListCreateView, AlquilerDetailView,
    LibroListCreateView, LibroDetailView,
    VendidoListCreateView, IntercambioListCreateView,
    LibrosVendidosView, LibrosAlquiladosView, LibrosIntercambiadosView,
    UsuarioCreateView, UsuarioDetailView, LibroByIdView, CompraCreateView, ContactoAutorCreateView
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path("login/", LoginView.as_view(), name="login"),
    path('alquileres/', AlquilerListCreateView.as_view(), name='alquiler-list-create'),
    path('alquileres/<int:pk>/', AlquilerDetailView.as_view(),name='alquiler-detail'),
    path('libros/', LibroListCreateView.as_view(), name='libros'),
    path('libros/<int:pk>/', LibroDetailView.as_view(), name='libro-detail'),
    path('usuarios/', UsuarioCreateView.as_view(), name='usuario-list'),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view(), name='usuario-detail'),
    path('vendidos/', VendidoListCreateView.as_view(), name='vendidos'),
    path('vendidos/', LibrosVendidosView.as_view()),
    path('alquilados/', LibrosAlquiladosView.as_view()),
    path('intercambios/', IntercambioListCreateView.as_view(), name='intercambios'),
    path('intercambios/', LibrosIntercambiadosView.as_view()),
    path('libro-id/<int:id>/', LibroByIdView.as_view()),
    path('carrito/', CompraCreateView.as_view(), name='carrito'),
    path('contacto-autor/', ContactoAutorCreateView.as_view(), name='contacto-autor'),

]
