import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/libro.css";

export default function LibroDetalles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/libro-id/${id}/`)
      .then((res) => setLibro(res.data[0]))
      .catch((err) => console.error("Error cargando libro:", err));
  }, [id]);

  if (!libro) return <h2 className="cargando">Cargando...</h2>;

    const agregarCarrito = async () => {
    await axios.post("http://localhost:8000/carrito/agregar/", {
      libro_id: libro.id,
      cantidad: 1,
    }, {
      withCredentials: true
    });
  
    alert("Agregado al carrito");
  };

  return (
    <div className="detalle-container">
      <div className="detalle-card">

        <img className="detalle-img" src={libro.imagen} alt={libro.titulo} />

        <div className="detalle-info">
          <h1>{libro.titulo}</h1>

          <p><strong>Autor:</strong> {libro.autor_o_editorial}</p>
          <p><strong>Género:</strong> {libro.genero}</p>
          <p><strong>Precio:</strong> ₡{libro.precio}</p>
          <p><strong>Estado:</strong> {libro.estado}</p>

          <p className="descripcion">
            {libro.descripcion}
          </p>

          <div className="acciones">
      <button onClick={agregarCarrito}>Agregar al carrito</button>

            <button className="btn intercambiar">Intercambiar</button>
            <button className="btn alquilar">Alquilar</button>
          </div>

          <button className="btn volver" onClick={() => navigate("/biblioteca")}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}
