import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MisDatos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const idUsuario = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario")).id
    : null;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/usuarios/${idUsuario}/`)
      .then(res => setUsuario(res.data))
      .catch(err => console.error("Error al cargar usuario:", err));
  }, [idUsuario]);

  const irEditarPerfil = () => navigate("/editar-perfil");

  if (!usuario) return <p>Cargando datos del usuario...</p>;

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
