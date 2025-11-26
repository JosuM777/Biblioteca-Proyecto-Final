import React, { useEffect, useState } from "react";
import axios from "axios";
import LibroCard from "../components/LibroCard";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("libros");

  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alquilados, setAlquilados] = useState([]);
  const [vendidos, setVendidos] = useState([]);
  const [intercambios, setIntercambios] = useState([]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [
        resLibros,
        resUsuarios,
        resAlquilados,
        resVendidos,
        resIntercambios
      ] = await Promise.all([
        axios.get("http://localhost:8000/api/libros/"),
        axios.get("http://localhost:8000/api/usuarios/"),
        axios.get("http://localhost:8000/api/alquileres/"),
        axios.get("http://localhost:8000/api/vendidos/"),
        axios.get("http://localhost:8000/api/intercambios/")
      ]);

      setLibros(resLibros.data);
      setUsuarios(resUsuarios.data);
      setAlquilados(resAlquilados.data);
      setVendidos(resVendidos.data);
      setIntercambios(resIntercambios.data);

    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los datos del servidor");
    } finally {
      setLoading(false);
    }
  };

  const eliminarConConfirmacion = (id, tipo) => {
    if (!window.confirm(`¿Seguro que deseas eliminar este ${tipo}?`)) return;

    let url = `http://localhost:8000/api/${tipo}/${id}/`;

    axios.delete(url)
      .then(cargarDatos)
      .catch(err => console.error(err));
  };


  // FILTROS
  const filtrarLibros = libros.filter(l =>
    l.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const filtrarUsuarios = usuarios.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.rol.toLowerCase().includes(search.toLowerCase())
  );

  const filtrarVendidos = vendidos.filter(v =>
    v.libro?.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const filtrarAlquilados = alquilados.filter(a =>
    a.libro?.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const filtrarIntercambios = intercambios.filter(i =>
    i.libro_ofrecido?.titulo.toLowerCase().includes(search.toLowerCase()) ||
    i.libro_recibido?.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const paginar = (items) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="adminp-container">
      <h1 className="adminp-title">Panel de Administración</h1>

      <div className="adminp-tab-menu">
        <button onClick={() => setTab("libros")} className={tab === "libros" ? "adminp-tab-active" : "adminp-tab"}>Libros</button>
        <button onClick={() => setTab("usuarios")} className={tab === "usuarios" ? "adminp-tab-active" : "adminp-tab"}>Usuarios</button>
        <button onClick={() => setTab("alquilados")} className={tab === "alquilados" ? "adminp-tab-active" : "adminp-tab"}>Alquilados</button>
        <button onClick={() => setTab("vendidos")} className={tab === "vendidos" ? "adminp-tab-active" : "adminp-tab"}>Vendidos</button>
        <button onClick={() => setTab("intercambios")} className={tab === "intercambios" ? "adminp-tab-active" : "adminp-tab"}>Intercambios</button>
      </div>

      <div className="adminp-search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          className="adminp-search-input"
        />
      </div>

// LIBROS
      {tab === "libros" && (
        <div>
          <button className="adminp-btn-crear" onClick={() => navigate("/crear-libro")}>
            Crear Libro
          </button>

          <div className="adminp-grid">
            {paginar(filtrarLibros).map(libro => (
              <div key={libro.id} className="adminp-item">
                <LibroCard libro={libro} />
                <img src={libro.img} alt={libro.titulo} className="adminp-libro-img" />
                <button onClick={() => navigate(`/editar/${libro.id}`)} className="adminp-btn-editar">Editar</button>
                <button onClick={() => eliminarConConfirmacion(libro.id, "libros")} className="adminp-btn-eliminar">Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}

// USUARIOS
      {tab === "usuarios" && (
        <div>
          <button className="adminp-btn-crear" onClick={() => navigate("/crear-usuario")}>
            Crear Usuario
          </button>

          <table className="adminp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginar(filtrarUsuarios).map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button onClick={() => navigate(`/editar-usuario/${u.id}`)} className="adminp-btn-editar">Editar</button>
                    <button onClick={() => eliminarConConfirmacion(u.id, "usuarios")} className="adminp-btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

// ALQUILADOS
      {tab === "alquilados" && (
        <div>
          <h2 className="adminp-subtitle">Libros Alquilados</h2>
          <table className="adminp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {paginar(filtrarAlquilados).map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.libro?.titulo}</td>
                  <td>{a.usuario}</td>
                  <td>{a.fecha_alquiler}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

// VENDIDOS
      {tab === "vendidos" && (
        <div>
          <h2 className="adminp-subtitle">Libros Vendidos</h2>
          <table className="adminp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {paginar(filtrarVendidos).map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.libro?.titulo}</td>
                  <td>{v.usuario}</td>
                  <td>{v.fecha_venta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

// INTERCAMBIOS
      {tab === "intercambios" && (
        <div>
          <h2 className="adminp-subtitle">Intercambios Realizados</h2>

          <table className="adminp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Libro Ofrecido</th>
                <th>Libro Recibido</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {paginar(filtrarIntercambios).map(i => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.libro_ofrecido?.titulo}</td>
                  <td>{i.libro_recibido?.titulo}</td>
                  <td>{i.usuario_intercambia}</td>
                  <td>{i.fecha_intercambio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

// PAGINACIÓN
      <div className="adminp-pagination">
        {Array.from({
          length: Math.ceil(
            (tab === "libros"
              ? filtrarLibros.length
              : tab === "usuarios"
                ? filtrarUsuarios.length
                : tab === "alquilados"
                  ? filtrarAlquilados.length
                  : tab === "vendidos"
                    ? filtrarVendidos.length
                    : filtrarIntercambios.length) / itemsPerPage)
        }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "adminp-page-active" : "adminp-page"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
