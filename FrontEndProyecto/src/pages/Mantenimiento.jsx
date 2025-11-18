import React, { useEffect, useState } from "react";
import axios from "axios";
//import "../styles/Mantenimiento.css";

export default function Mantenimiento() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/libros")
      .then(res => setLibros(res.data));
  }, []);

  const actualizarEstado = (id, estado) => {
    axios.put(`http://localhost:3001/libros/${id}`, { estado })
      .then(() => window.location.reload());
  };

  return (
    <div className="mantenimiento-container">
      <h1>Mantenimiento de Libros</h1>

      {libros.map(libro => (
        <div key={libro.id} className="mant-card">
          <h3>{libro.titulo}</h3>

          <select
            value={libro.estado}
            onChange={(e) => actualizarEstado(libro.id, e.target.value)}
          >
            <option value="disponible">Disponible</option>
            <option value="alquilado">Alquilado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      ))}
    </div>
  );
}
