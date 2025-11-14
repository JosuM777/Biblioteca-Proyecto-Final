import React from "react";
import { useNavigate } from "react-router-dom";

export default function MisDatos() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const irEditarPerfil = () => navigate("/editar-perfil");

  if (!usuario) return <p>No has iniciado sesión.</p>;

  return (
    <div className="misdatos-card">
      <h2>Mis Datos</h2>

      <div className="misdatos-info">
        <p><strong>Nombre:</strong> {usuario.first_name} {usuario.last_name}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <p><strong>Teléfono:</strong> {usuario.num_telefono}</p>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
      </div>

      <button className="btn-editar" onClick={irEditarPerfil}>
        Editar Perfil
      </button>
    </div>
  );
}
