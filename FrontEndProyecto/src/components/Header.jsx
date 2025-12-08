import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import carritoImg from "../img/carritoImg.png";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const rol = usuario?.rol || null;

  const [count, setCount] = useState(0);

  // Leer cantidad del carrito
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCount(carritoLocal.length);

    const actualizar = () => {
      const nuevo = JSON.parse(localStorage.getItem("carrito")) || [];
      setCount(nuevo.length);
    };

    window.addEventListener("storageUpdate", actualizar);
    return () => window.removeEventListener("storageUpdate", actualizar);
  }, []);


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

        {location.pathname !== "/carrito" && (
          <div className="header-cart" onClick={() => navigate("/carrito")}>
            <img src={carritoImg} className="header-cart-icon" alt="Carrito" />
            {count > 0 && <span className="header-cart-count">{count}</span>}
          </div>
        )}

      </nav>
    </header>
  );
}
