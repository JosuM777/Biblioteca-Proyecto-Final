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

  // FILTRADO INTELIGENTE
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

  // Géneros únicos ordenados
  const generosUnicos = [...new Set(libros.map((l) => l.genero))]
    .filter((g) => g && g !== "")
    .sort();

  return (
    <div className="biblioteca-layout">
      {/* SIDEBAR DE FILTROS */}
      <aside className="sidebar-filtros">
        <h2>Filtros</h2>

        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={filtro.busqueda}
          onChange={(e) =>
            setFiltro({ ...filtro, busqueda: e.target.value })
          }
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="biblioteca-main">
        <h1>Biblioteca ReBook</h1>

        {loading ? (
          <p className="cargando">Cargando libros...</p>
        ) : (
          <div className="libros-grid">
            {librosFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron libros</p>
            ) : (
              librosFiltrados.map((libro) => (
                <div
                  key={libro.id}
                  className={`libro-card estado-${libro.estado}`}
                  onClick={() => navigate(`/libro-id/${libro.id}`)}
                >
                  {libro.imagen ? (
                    <img src={libro.imagen} alt={libro.titulo} className="libro-img" />
                  ) : (
                    <div className="placeholder-img">Sin imagen</div>
                  )}

                  <div className="libro-info">
                    <h3>{libro.titulo}</h3>
                    <p><strong>Autor:</strong> {libro.autor_o_editorial}</p>
                    <p><strong>Género:</strong> {libro.genero}</p>
                    <p><strong>Precio:</strong> ₡{libro.precio}</p>

                    <span className={`estado-tag tag-${libro.estado}`}>
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
