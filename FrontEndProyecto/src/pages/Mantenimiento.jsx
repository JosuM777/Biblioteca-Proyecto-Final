import React from "react";
import axios from "axios";

export default function Mantenimiento() {

  const limpiarHistorial = () => {
    axios.delete("http://localhost:8000/historial")
      .then(() => alert("Historial borrado"));
  };

  const resetLibros = () => {
    axios.post("http://localhost:8000/reset/libros")
      .then(() => alert("Libros restaurados"));
  };

  const resetUsuarios = () => {
    axios.post("http://localhost:8000/reset/usuarios")
      .then(() => alert("Usuarios restaurados"));
  };

  return (
    <div className="admin-container">
      <h1>Mantenimiento del Sistema</h1>

      <div className="maint-grid">

        <button onClick={limpiarHistorial} className="maint-btn">
          Borrar historial de alquileres
        </button>

        <button onClick={resetLibros} className="maint-btn">
          Restaurar libros a valores iniciales
        </button>

        <button onClick={resetUsuarios} className="maint-btn">
          Restaurar usuarios
        </button>

      </div>
    </div>
  );
}
