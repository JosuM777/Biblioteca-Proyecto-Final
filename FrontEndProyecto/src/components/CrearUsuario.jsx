import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/crearUsuario.css";

export default function CrearUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    num_telefono: "",
    direccion: "",
    rol: "usuario",
  });

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
   // Envío de datos al backend
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (fotoPerfil) {
        formData.append("foto_perfil", fotoPerfil);
      }
// Crear usuario
      await axios.post(
        "http://localhost:8000/api/usuarios/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Usuario creado exitosamente");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Error al crear usuario. Revise los campos.");
    }
  };

  return (
    <div className="crearusuario-container">
      <div className="crearusuario-card">
        <h1 className="crearusuario-title">Crear Usuario</h1>

        {error && <p className="crearusuario-error">{error}</p>}

        <form onSubmit={handleSubmit} className="crearusuario-form">

          <label>Nombre de usuario</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />

          <label>Correo electrónico</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <label>Número de teléfono</label>
          <input type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} />

          <label>Dirección</label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} />

          <label>Rol del usuario</label>
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="usuario">Usuario</option>
            <option value="autor">Autor</option>
            <option value="admin">Administrador</option>
          </select>

          <label>Foto de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFotoPerfil(e.target.files[0])}
          />

          <button type="submit" className="crearusuario-btn">
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
