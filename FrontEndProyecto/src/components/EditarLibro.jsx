import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [libro, setLibro] = useState({
    titulo: "",
    autor: "",
    precio: "",
    descripcion: "",
    genero: "",
    imagen: "",
    estado: "disponible",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/libros/${id}`)
      .then(res => setLibro(res.data))
      .catch(err => console.log(err));
  }, [id]);

  function handleChange(e) {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.put(`http://localhost:3001/libros/${id}`, libro)
      .then(() => {
        alert("Libro actualizado correctamente");
        navigate("/admin");
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="editar-libro-container">
      <h1>Editar Libro</h1>

      <form className="form-editar" onSubmit={handleSubmit}>
        
        <label>Título</label>
        <input name="titulo" value={libro.titulo} onChange={handleChange} />

        <label>Autor</label>
        <input name="autor" value={libro.autor} onChange={handleChange} />

        <label>Precio</label>
        <input name="precio" value={libro.precio} onChange={handleChange} />

        <label>Género</label>
        <input name="genero" value={libro.genero} onChange={handleChange} />

        <label>Estado</label>
        <select name="estado" value={libro.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>

        <label>Descripción</label>
        <textarea name="descripcion" value={libro.descripcion} onChange={handleChange} />

        <label>Imagen (URL)</label>
        <input name="imagen" value={libro.imagen} onChange={handleChange} />

        <button className="btn-guardar" type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}
