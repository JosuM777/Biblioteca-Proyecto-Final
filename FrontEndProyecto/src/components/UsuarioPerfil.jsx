import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/usuarioPerfil.css";

export default function UsuarioPerfil() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [librosAutor, setLibrosAutor] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    autor: id,
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/usuarios/${id}/`)
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://127.0.0.1:8000/api/libros/?autor=${id}`)
      .then((res) => setLibrosAutor(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/contacto-autor/", formData)
      .then(() => alert("Mensaje enviado correctamente"))
      .catch(() => alert("Error al enviar el mensaje"));
  };

  if (!usuario) return <h2>Cargando...</h2>;

  return (
    <div className="perfil-container">

      {/* INFO DEL USUARIO Y FORMULARIO */}
      <div className="perfil-left">

        {/* PERFIL */}
        <div className="perfil-info">
          <img src={usuario.foto_perfil} className="perfil-img" />
          <h1 className="perfil-username">{usuario.username}</h1>
          <p className="perfil-email">{usuario.email}</p>
          <p className="perfil-rol">
            <strong>Ocupación:</strong> {usuario.rol}
          </p>
        </div>

        {/* FORMULARIO */}
        <form className="perfil-form" onSubmit={enviarMensaje}>
          <h2>Contactar al autor</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            onChange={handleChange}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje..."
            rows="4"
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
      </div>

      {/* LIBROS DEL AUTOR */}
      <div className="perfil-libros">
        <h2>Libros creados por este autor</h2>

        {librosAutor.length === 0 ? (
          <p className="sin-libros">Este autor no tiene libros publicados.</p>
        ) : (
          <div className="libros-grid">
            {librosAutor.map((libro) => (
              <div key={libro.id} className="libro-card">
                <img src={libro.imagen} alt={libro.titulo} className="libro-img" />
                <h3>{libro.titulo}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
