import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/libro.css";

export default function LibroDetalles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  // USUARIO ACTUAL
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const carritoKey = usuario ? `carrito_${usuario.id}` : "carrito_invitado";

  const [carritoLocal, setCarritoLocal] = useState(
    JSON.parse(localStorage.getItem(carritoKey)) || []
  );

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/libro-id/${id}/`)
      .then((res) => setLibro(res.data[0]))
      .catch((err) => console.error("Error cargando libro:", err));
  }, [id]);

  if (!libro) return <h2 className="cargando">Cargando...</h2>;

  // AGREGAR AL CARRITO CON CANTIDAD
  const agregarCarrito = () => {
    if (!usuario) {
      alert("Debe iniciar sesión para agregar libros al carrito");
      return;
    }

    // Buscar si el libro ya existe en el carrito
    const existente = carritoLocal.find((item) => item.id === libro.id);

    let nuevoCarrito;

    if (existente) {
      // YA EXISTE → aumentar cantidad
      nuevoCarrito = carritoLocal.map((item) =>
        item.id === libro.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      // NO EXISTE - agregar con cantidad 1
      nuevoCarrito = [
        ...carritoLocal,
        {
          id: libro.id,
          titulo: libro.titulo,
          precio: libro.precio,
          imagen: libro.imagen,
          cantidad: 1,
        },
      ];
    }

    // Guardar en localStorage
    localStorage.setItem(carritoKey, JSON.stringify(nuevoCarrito));

    // Actualizar estado
    setCarritoLocal(nuevoCarrito);
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

          <button className="btn agregar-carrito" onClick={agregarCarrito}>
            Agregar al carrito
          </button>


          <button className="btn volver" onClick={() => navigate("/biblioteca")}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}
