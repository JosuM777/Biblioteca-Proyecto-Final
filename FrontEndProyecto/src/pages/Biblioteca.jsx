import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/biblioteca.css";

export default function Biblioteca() {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    busqueda: "",
    genero: "",
    estado: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/libros/")
      .then((res) => setLibros(res.data))
      .catch((err) => console.error("Error cargando libros:", err))
      .finally(() => setLoading(false));
  }, []);

  const librosFiltrados = libros.filter((libro) => {
    const txt = filtro.busqueda.toLowerCase();
    const coincideBusqueda =
      libro.titulo.toLowerCase().includes(txt) ||
      (libro.autor_o_editorial &&
        libro.autor_o_editorial.toLowerCase().includes(txt));
    const coincideGenero =
      filtro.genero === "" || libro.genero === filtro.genero;
    const coincideEstado =
      filtro.estado === "" || libro.estado === filtro.estado;
    return coincideBusqueda && coincideGenero && coincideEstado;
  });

  const generosUnicos = [...new Set(libros.map((l) => l.genero))]
    .filter((g) => g && g !== "")
    .sort();

  return (
    <div className="rb-biblioteca-layout">
      
      {/* SIDEBAR */}
      <aside className="rb-sidebar-filtros">
        <h2>Filtros</h2>

        <input
          type="text"
          placeholder="Buscar por título o autor..."
          className="rb-input"
          value={filtro.busqueda}
          onChange={(e) => setFiltro({ ...filtro, busqueda: e.target.value })}
        />

        <select
          className="rb-select"
          value={filtro.genero}
          onChange={(e) => setFiltro({ ...filtro, genero: e.target.value })}
        >
          <option value="">Todos los géneros</option>
          {generosUnicos.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>

        <select
          className="rb-select"
          value={filtro.estado}
          onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
        >
          <option value="">Todos los estados</option>
          <option value="disponible">Disponible</option>
          <option value="alquilado">Alquilado</option>
          <option value="vendido">Vendido</option>
        </select>
      </aside>

      {/* CONTENIDO */}
      <main className="rb-biblioteca-main">

        {loading ? (
          <p className="rb-cargando">Cargando libros...</p>
        ) : (
          <div className="rb-libros-grid">
            {librosFiltrados.length === 0 ? (
              <p className="rb-sin-resultados">No se encontraron libros</p>
            ) : (
              librosFiltrados.map((libro) => (
                <div
                  key={libro.id}
                  className={`rb-libro-card rb-estado-${libro.estado}`}
                  onClick={() => navigate(`/libro-id/${libro.id}`)}
                >
                  {libro.imagen ? (
                    <img
                      src={libro.imagen}
                      alt={libro.titulo}
                      className="rb-libro-img"
                    />
                  ) : (
                    <div className="rb-placeholder-img">Sin imagen</div>
                  )}

                  <div className="rb-libro-info">
                    <h3>{libro.titulo}</h3>
                    <p><strong>Autor:</strong> {libro.autor_o_editorial}</p>
                    <p><strong>Género:</strong> {libro.genero}</p>
                    <p><strong>Precio:</strong> ₡{libro.precio}</p>

                    <span className={`rb-estado-tag rb-tag-${libro.estado}`}>
                      {libro.estado.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

    </div>
  );
}
