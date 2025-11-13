import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/biblioteca.css";

export default function Biblioteca() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState({
    busqueda: "",
    genero: "",
    estado: "",
  });

  // Cargar todos los libros al iniciar
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/libros/")
      .then((res) => setLibros(res.data))
      .catch((err) => console.error("Error cargando libros:", err));
  }, []);

  // Filtrar libros según los criterios seleccionados
  const librosFiltrados = libros.filter((libro) => {
    const coincideBusqueda =
      libro.titulo.toLowerCase().includes(filtro.busqueda.toLowerCase()) ||
      (libro.autor_o_editorial &&
        libro.autor_o_editorial.toLowerCase().includes(filtro.busqueda.toLowerCase()));

    const coincideGenero =
      filtro.genero === "" || libro.genero === filtro.genero;

    const coincideEstado =
      filtro.estado === "" || libro.estado === filtro.estado;

    return coincideBusqueda && coincideGenero && coincideEstado;
  });

  // Extraer géneros únicos del listado
  const generosUnicos = [...new Set(libros.map((l) => l.genero))];

  return (
    <div className="biblioteca-layout">
      <aside className="sidebar-filtros">
        <h2>Filtros</h2>

        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={filtro.busqueda}
          onChange={(e) => setFiltro({ ...filtro, busqueda: e.target.value })}
        />

        <select
          value={filtro.genero}
          onChange={(e) => setFiltro({ ...filtro, genero: e.target.value })}
        >
          <option value="">Todos los géneros</option>
          {generosUnicos.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={filtro.estado}
          onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
        >
          <option value="">Todos los estados</option>
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>
      </aside>

      <main className="biblioteca-main">
        <h1> Biblioteca ReBook</h1>
        <div className="libros-grid">
          {librosFiltrados.length === 0 ? (
            <p className="sin-resultados">No se encontraron libros 😕</p>
          ) : (
            librosFiltrados.map((libro) => (
              <div key={libro.id} className={`libro-card ${libro.estado}`}>
                {libro.imagen && (
                  <img
                    src={`http://localhost:8000${libro.imagen}`}
                    alt={libro.titulo}
                    className="libro-img"
                  />
                )}
                <div className="libro-info">
                  <h3>{libro.titulo}</h3>
                  <p>
                    <strong>Autor:</strong> {libro.autor_o_editorial}
                  </p>
                  <p>
                    <strong>Género:</strong> {libro.genero}
                  </p>
                  <p>
                    <strong>Precio:</strong> ₡{libro.precio}
                  </p>
                  <p>
                    <strong>Estado:</strong> {libro.estado}
                  </p>
                  <p className="desc">{libro.descripcion}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
