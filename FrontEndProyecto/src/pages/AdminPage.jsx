import React, { useEffect, useState } from "react";
import axios from "axios";
import LibroCard from "../components/LibroCard";

export default function AdminPage() {
  const [tab, setTab] = useState("libros");

  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    cargarLibros();
    cargarUsuarios();
    cargarAutores();
  }, []);

  const cargarLibros = () => {
    axios.get("http://localhost:8000/libros")
      .then(res => setLibros(res.data));
  };

  const cargarUsuarios = () => {
    axios.get("http://localhost:8000/usuarios")
      .then(res => setUsuarios(res.data));
  };

  const cargarAutores = () => {
    axios.get("http://localhost:8000/autores")
      .then(res => setAutores(res.data));
  };

  const eliminarLibro = (id) => {
    axios.delete(`http://localhost:8000/libros/${id}`).then(cargarLibros);
  };

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:8000/usuarios/${id}`).then(cargarUsuarios);
  };

  const eliminarAutor = (id) => {
    axios.delete(`http://localhost:8000/autores/${id}`).then(cargarAutores);
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      <div className="tab-menu">
        <button onClick={() => setTab("libros")} className={tab === "libros" ? "active" : ""}>Libros</button>
        <button onClick={() => setTab("usuarios")} className={tab === "usuarios" ? "active" : ""}>Usuarios</button>
        <button onClick={() => setTab("autores")} className={tab === "autores" ? "active" : ""}>Autores</button>
      </div>

      {tab === "libros" && (
        <div>
          <button className="btn-crear" onClick={() => window.location.href = "/crear"}>
            Crear Libro
          </button>

          <div className="admin-grid">
            {libros.map(libro => (
              <div key={libro.id} className="admin-item">
                <LibroCard libro={libro} />
                <button onClick={() => window.location.href = `/editar/${libro.id}`} className="btn-editar">Editar</button>
                <button onClick={() => eliminarLibro(libro.id)} className="btn-eliminar">Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "usuarios" && (
        <div>
          <button className="btn-crear" onClick={() => window.location.href = "/crear-usuario"}>
            Crear Usuario
          </button>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button onClick={() => window.location.href = `/editar-usuario/${u.id}`} className="btn-editar">Editar</button>
                    <button onClick={() => eliminarUsuario(u.id)} className="btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "autores" && (
        <div>
          <button className="btn-crear" onClick={() => window.location.href = "/crear-autor"}>
            Crear Autor
          </button>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {autores.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.nacionalidad}</td>
                  <td>
                    <button onClick={() => window.location.href = `/editar-autor/${a.id}`} className="btn-editar">Editar</button>
                    <button onClick={() => eliminarAutor(a.id)} className="btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
