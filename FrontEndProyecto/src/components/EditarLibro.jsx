import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditarLibro.css";

export default function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [libro, setLibro] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    estado: "",
    genero: "",
    autor_o_editorial: "",
    imagen: null,
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/libros/${id}/`)
      .then((res) => {
        setLibro({
          titulo: res.data.titulo ?? "",
          descripcion: res.data.descripcion ?? "",
          precio: res.data.precio ?? "",
          estado: res.data.estado ?? "",
          genero: res.data.genero ?? "",
          autor_o_editorial: res.data.autor_o_editorial ?? "",
          imagen: res.data.imagen ?? null,
        });
      })
      .catch((err) => console.error("Error al cargar el libro:", err));
  }, [id]);

  function handleChange(e) {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImagenFile(file);
    if (file) {
      setImagenPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", libro.titulo);
    formData.append("autor_o_editorial", libro.autor_o_editorial);
    formData.append("precio", libro.precio);
    formData.append("descripcion", libro.descripcion);
    formData.append("genero", libro.genero);
    formData.append("estado", libro.estado);

    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }

    axios
      .put(`http://localhost:8000/api/libros/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Libro actualizado correctamente");
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Error al actualizar el libro:", err);
        alert("Hubo un problema al guardar los cambios.");
      });
  }

  return (
    <div className="editar-libro-container">
      <h1>Editar Libro</h1>

      <form className="form-editar" onSubmit={handleSubmit}>
        
        <label>Título</label>
        <input name="titulo" value={libro.titulo} onChange={handleChange} required />

        <label>Autor o Editorial</label>
        <input
          name="autor_o_editorial"
          value={libro.autor_o_editorial}
          onChange={handleChange}
          required
        />

        <label>Precio</label>
        <input name="precio" value={libro.precio} onChange={handleChange} required />

        <label>Género</label>
        <input name="genero" value={libro.genero} onChange={handleChange} required />

        <label>Estado</label>
        <select name="estado" value={libro.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={libro.descripcion}
          onChange={handleChange}
          required
        />

        <label>Agregar imagen</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        {imagenPreview && (
          <div className="imagen-preview">
            <p>Vista previa:</p>
            <img src={imagenPreview} alt="preview" />
          </div>
        )}

        <button className="btn-guardar" type="submit">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
