import React, { useState } from "react";
import axios from "axios";

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

  // También podrías tener un estado para errores o para el estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Si files existe (input type="file"), actualizamos el campo imagen, 
    // de lo contrario actualizamos con el value normal
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],  // archivo
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,     // valor normal
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    for (const key in formData) {
      // Solo añadir al FormData si el valor no es null
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post("http://localhost:8000/api/libros/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Libro creado exitosamente");

      // Resetear formulario
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
      <h1>Agregar Libro</h1>
      <form onSubmit={handleSubmit} className="crear-libro-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="autor_o_editorial"
          placeholder="Autor o Editorial"
          value={formData.autor_o_editorial}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={formData.genero}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />

        <select
          name="estado"
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
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Libro"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
