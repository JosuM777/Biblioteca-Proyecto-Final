import React, { useState } from "react";
import axios from "axios";
import "../styles/CrearLibro.css";

export default function CrearLibro() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autor_o_editorial: "",
    genero: "",
    precio: "",
    estado: "disponible",
    imagen: null,
    creador: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // cambios en el formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }
   // Envío de datos al backend
    try {
      await axios.post("http://localhost:8000/api/libros/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Libro creado exitosamente");

      setFormData({
        titulo: "",
        descripcion: "",
        autor_o_editorial: "",
        genero: "",
        precio: "",
        estado: "disponible",
        imagen: null,
        creador: 1,
      });
    } catch (err) {
      console.error(err);
      setError("Error al crear libro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="crear-libro-container">
      <h1 className="crear-libro-title">Agregar Libro</h1>

      <form onSubmit={handleSubmit} className="crear-libro-form">
        
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          className="input-text"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="autor_o_editorial"
          placeholder="Autor o Editorial"
          className="input-text"
          value={formData.autor_o_editorial}
          onChange={handleChange}
          required
        />

        <select
          className="select-genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">Géneros Literarios</option>
          <option value="fantasia">Fantasía</option>
          <option value="ciencia-ficcion">Ciencia ficción</option>
          <option value="romance">Romance</option>
          <option value="terror">Terror / Horror</option>
          <option value="misterio">Misterio / Thriller / Suspenso</option>
          <option value="juvenil">Juvenil (YA)</option>
          <option value="no-ficcion">No ficción</option>
          <option value="historico">Histórico</option>
          <option value="anime">anime</option>
        </select>

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          className="input-number"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          className="textarea-descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />

        <select
          name="estado"
          className="select-estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>

        <input
          type="file"
          name="imagen"
          className="input-file"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Libro"}
        </button>
      </form>

      {error && <p className="crear-libro-error">{error}</p>}
    </div>
  );
}
