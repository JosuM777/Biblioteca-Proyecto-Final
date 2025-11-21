import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MisDatos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const idUsuario = JSON.parse(localStorage.getItem("usuario")).id;

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

      {usuario.foto_perfil && (
        <img
          src={usuario.foto_perfil}
          alt="Foto de perfil"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem"
          }}
        />
      )}

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
