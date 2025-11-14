import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MisDatos from "../components/MisDatos";
import MisLibros from "../components/MisLibros";
import EditarPerfil from "../components/EditarPerfil";
import "../styles/micuenta.css";

export default function MiCuenta() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 🔐 Si NO hay usuario, redirigir al login
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [ navigate, usuario ]);

  if (!usuario) return null; // evita error antes de redirigir

  return (
    <div className="cuenta-container">
      {/* SIDEBAR */}
      <aside className="cuenta-sidebar">
        <h2>Mi Cuenta</h2>
        <ul>
          <li><a href="#datos">Mis Datos</a></li>
          <li><a href="#libros">Mis Libros</a></li>
        </ul>
      </aside>

      {/* CONTENIDO */}
      <main className="cuenta-main">
        <section id="datos">
          <MisDatos />
        </section>

        <section id="libros">
          <MisLibros />
        </section>
      </main>
    </div>
  );
}
