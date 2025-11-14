import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditarPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    num_telefono: "",
    direccion: ""
  });

  // 1️⃣ Cargar usuario desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      const user = JSON.parse(data);
      setUsuario(user);
      setForm({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        num_telefono: user.num_telefono || "",
        direccion: user.direccion || "",
      });
    }
  }, []);

  if (!usuario) {
    return <p>Cargando información...</p>;
  }

  // 2️⃣ Manejar cambios en los inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 3️⃣ Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/usuarios/${usuario.id}/`,
        form
      );

      // Actualizar localStorage
      localStorage.setItem("usuario", JSON.stringify(res.data));

      alert("Perfil actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al actualizar perfil.");
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar Perfil</h2>

      <form onSubmit={handleSubmit} className="form-editar">
        <label>Nombre de usuario</label>
        <input name="username" value={form.username} onChange={handleChange} />

        <label>Correo</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Nombre</label>
        <input name="first_name" value={form.first_name} onChange={handleChange} />

        <label>Apellido</label>
        <input name="last_name" value={form.last_name} onChange={handleChange} />

        <label>Teléfono</label>
        <input name="num_telefono" value={form.num_telefono} onChange={handleChange} />

        <label>Dirección</label>
        <input name="direccion" value={form.direccion} onChange={handleChange} />

        <button type="submit" className="btn-guardar">Guardar Cambios</button>
      </form>
    </div>
  );
}
