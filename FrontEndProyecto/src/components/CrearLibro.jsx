import React, { useState } from "react";
import axios from "axios";

export default function CrearLibro() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    genero: "",
    precio: "",
    estado: "disponible",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) form.append(key, formData[key]);

    try {
      await axios.post("http://localhost:8000/api/libros/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Libro creado exitosamente");
      setFormData({
        titulo: "",
        descripcion: "",
        autor: "",
        genero: "",
        precio: "",
        estado: "disponible",
        imagen: null,
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear libro");
    }
  };

  return (
    <div className="crear-libro-container">
      <h1>Agregar Libro</h1>
      <form onSubmit={handleSubmit} className="crear-libro-form">
        <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <input type="text" name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} required />
        <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
        <button type="submit">Crear Libro</button>
      </form>
    </div>
  );
}
