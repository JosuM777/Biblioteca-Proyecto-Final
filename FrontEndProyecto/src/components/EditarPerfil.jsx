import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // ✅ Hook para redirección

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
      if (user.foto_perfil) {
        setPreview(user.foto_perfil);
      }
    }
  }, []);

  if (!usuario) {
    return <p>Cargando información...</p>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoPerfil(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (fotoPerfil) {
        formData.append("foto_perfil", fotoPerfil);
      }

      const res = await axios.put(
        `http://localhost:8000/api/usuarios/${usuario.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      localStorage.setItem("usuario", JSON.stringify(res.data));
      alert("Perfil actualizado exitosamente.");
      navigate("/account"); // ✅ Redirección después de actualizar

    } catch (error) {
      console.error("Error al actualizar perfil:", error.response?.data || error.message);
      alert("Error al actualizar perfil: " + JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar Perfil</h2>

      <form onSubmit={handleSubmit} className="form-editar">
        {preview && (
          <img
            src={preview}
            alt="Foto de perfil"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
          />
        )}

        <label>Foto de perfil</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

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
