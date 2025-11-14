import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/misLibros.css";

export default function MisLibros({ usuario }) {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar libros del usuario
  useEffect(() => {
    if (!usuario?.id) return;

    axios
      .get(`http://localhost:8000/api/libros/?usuario=${usuario.id}`)
      .then((res) => setLibros(res.data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [usuario]);

  // 🔹 Eliminar libro
  const eliminarLibro = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este libro?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/libros/${id}/`);
      setLibros(libros.filter((l) => l.id !== id));
    } catch (err) {
      alert("No se pudo eliminar el libro");
      console.error(err);
    }
  };

  // 🔹 Cambiar estado del libro
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.patch(`http://localhost:8000/api/libros/${id}/`, {
        estado: nuevoEstado,
      });

      setLibros(
        libros.map((l) => (l.id === id ? { ...l, estado: nuevoEstado } : l))
      );
    } catch (err) {
      alert("No se pudo actualizar el estado");
      console.error(err);
    }
  };

  return (
    <div className="mislibros-container">
      <div className="mislibros-header">
        <h2>📘 Mis Libros</h2>
        <a href="/crear-libro" className="btn-crear">+ Crear nuevo libro</a>
      </div>

      {loading ? (
        <p className="cargando">Cargando...</p>
      ) : libros.length === 0 ? (
        <p className="sin-libros">Aún no has registrado libros.</p>
      ) : (
        <div className="mislibros-grid">
          {libros.map((libro) => (
            <div key={libro.id} className="mislibros-card">
              {libro.imagen && (
                <img
                  src={`http://localhost:8000${libro.imagen}`}
                  alt={libro.titulo}
                  className="mislibros-img"
                />
              )}

              <div className="mislibros-info">
                <h3>{libro.titulo}</h3>
                <p className="autor">{libro.autor_o_editorial}</p>
                <p className="genero">{libro.genero}</p>
                <p className="precio">₡{libro.precio}</p>

                <span className={`estado ${libro.estado}`}>
                  {libro.estado}
                </span>

                {/* BOTONES */}
                <div className="botones-libro">
                  
                  {/* Ver detalles */}
                  <a href={`/libro/${libro.id}`} className="btn-detalle">
                    👁 Ver
                  </a>

                  {/* Editar */}
                  <a href={`/editar-libro/${libro.id}`} className="btn-editar">
                    ✏ Editar
                  </a>

                  {/* Eliminar */}
                  <button
                    onClick={() => eliminarLibro(libro.id)}
                    className="btn-eliminar"
                  >
                    🗑 Eliminar
                  </button>
                </div>

                {/* CAMBIAR ESTADO */}
                <div className="estado-botones">
                  {libro.estado !== "disponible" && (
                    <button
                      onClick={() => cambiarEstado(libro.id, "disponible")}
                      className="btn-estado disponible-btn"
                    >
                      Disponible
                    </button>
                  )}
                  {libro.estado !== "vendido" && (
                    <button
                      onClick={() => cambiarEstado(libro.id, "vendido")}
                      className="btn-estado vendido-btn"
                    >
                      Vendido
                    </button>
                  )}
                  {libro.estado !== "alquilado" && (
                    <button
                      onClick={() => cambiarEstado(libro.id, "alquilado")}
                      className="btn-estado alquilado-btn"
                    >
                      Alquilado
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
