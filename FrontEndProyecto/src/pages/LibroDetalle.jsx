import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import "../styles/LibroDetalle.css";

export default function LibroDetalle() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/libros/${id}`)
      .then(res => setLibro(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!libro) return <h2>Cargando...</h2>;

  return (
    <div className="detalle-container">
      <img src={libro.img} alt={libro.titulo} className="detalle-img" />

      <div className="detalle-info">
        <h1>{libro.titulo}</h1>
        <h3>{libro.autor}</h3>
        <p><strong>Precio:</strong> ₡{libro.precio}</p>
        <p><strong>Género:</strong> {libro.genero}</p>
        <p><strong>Estado:</strong> {libro.estado}</p>

        <h3>Descripción</h3>
        <p>{libro.descripcion}</p>
      </div>
    </div>
  );
}
