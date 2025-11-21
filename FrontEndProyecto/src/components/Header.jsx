import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

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
        {usuario.rol === "admin" && (
          <>
          <button className="nav-btn" onClick={() => navigate("/admin")}>
            Admin
          </button>
          <button className="nav-btn" onClick={() => navigate("/mantenimiento")}>
            Mantenieminto
          </button>
          </>
        )}
        <button className="nav-btn" onClick={() => navigate("/crear-libro")}>
          Crear Libro
        </button>

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
