import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//cdimport axios from "axios";

export default function MisDatos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const idUsuario = JSON.parse(localStorage.getItem("usuario")).user.id;
// Obtener datos del usuario
  useEffect(() => {
    const traerUsuario = async() =>{
      const peticion = await fetch(`http://127.0.0.1:8000/api/usuarios/${idUsuario}/`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await peticion.json();
      setUsuario(data);
    }
    traerUsuario();
  }, [idUsuario]);

  const irEditarPerfil = () => navigate("/editar-perfil");

  if (!usuario) return <p>Cargando datos del usuario...</p>;

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    navigate("/login");
  };

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

      <div className="cuenta-botones">
        <button className="btn-editar" onClick={irEditarPerfil}>
          Editar Perfil
        </button>

        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

    </div>
  );
}
