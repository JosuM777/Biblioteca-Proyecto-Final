import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("num_telefono", form.num_telefono);
      formData.append("direccion", form.direccion);
      formData.append("rol", form.rol);

      if (fotoPerfil) {
        formData.append("foto_perfil", fotoPerfil);
      }

      const _res_ = await axios.post(
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
    <div className="container" style={{ padding: "20px" }}>
      <h1>Crear Usuario</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-crear">

        <label>Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Número de teléfono</label>
        <input
          type="text"
          name="num_telefono"
          value={form.num_telefono}
          onChange={handleChange}
        />

        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />

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

        <button type="submit" className="btn-crear">
          Crear Usuario
        </button>
      </form>
    </div>
  );
}
