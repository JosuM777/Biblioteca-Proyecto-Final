import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();

  // Si no hay usuario, usuario será null sin causar error
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Leer el rol solo si existe usuario
  const rol = usuario?.rol || null;

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/")}>ReBook</h1>

      <nav className="nav-links">

        <button className="nav-btn" onClick={() => navigate("/")}>
          Inicio
        </button>

        <button className="nav-btn" onClick={() => navigate("/biblioteca")}>
          Biblioteca
        </button>

        {rol === "admin" && (
          <>
            <button className="nav-btn" onClick={() => navigate("/admin")}>
              Admin
            </button>
            <button className="nav-btn" onClick={() => navigate("/mantenimiento")}>
              Mantenimiento
            </button>
            <button className="nav-btn" onClick={() => navigate("/crear-libro")}>
              Crear Libro
            </button>
          </>
        )}

        {rol === "autor" && (
          <>

            <button className="nav-btn" onClick={() => navigate("/crear-libro")}>
              Crear Libro
            </button>

          </>
        )}


        {usuario ? (
          <>
            <button className="nav-btn" onClick={() => navigate("/account")}>
              Mi Cuenta
            </button>

            <button className="btn-logout" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>

            <button className="nav-btn" onClick={() => navigate("/register")}>
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
