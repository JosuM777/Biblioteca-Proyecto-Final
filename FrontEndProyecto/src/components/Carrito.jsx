import React, { useEffect, useState } from "react";
import "../styles/carrito.css";

export default function Carrito() {
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);

  // Usuario actual
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const carritoKey = usuario ? `carrito_${usuario.id}` : null;

  // ================================
  // Cargar carrito automáticamente
  // ================================
  useEffect(() => {
    if (!usuario) {
      setCarrito([]);
      setLoading(false);
      return;
    }

    const cargarCarrito = () => {
      const carritoLocal = localStorage.getItem(carritoKey);
      setCarrito(carritoLocal ? JSON.parse(carritoLocal) : []);
      setLoading(false);
    };

    cargarCarrito();

    // Actualizar carrito al volver a ventana
    window.addEventListener("focus", cargarCarrito);
    return () => window.removeEventListener("focus", cargarCarrito);
  }, [usuario, carritoKey]);

  // Guardar cambios
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(carritoKey, JSON.stringify(nuevoCarrito));
  };

  // ================================
  // Aumentar cantidad
  // ================================
  const aumentarCantidad = (id) => {
    const nuevo = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );

    guardarCarrito(nuevo);
  };

  // ================================
  // Disminuir cantidad
  // ================================
  const disminuirCantidad = (id) => {
    const nuevo = carrito
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item
      )
      .filter((item) => item.cantidad > 0);

    guardarCarrito(nuevo);
  };

  // ================================
  //Eliminar item
  // ================================
  const eliminarItem = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevo);
  };

  if (loading) return <h2>Cargando carrito...</h2>;

  return (
    <div className="carrito-container">
      <h1 className="titulo-carrito">Carrito</h1>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">Carrito vacío</p>
      ) : (
        <div className="carrito-items">
          {carrito.map((item) => (
            <div className="carrito-item" key={item.id}>
              <img src={item.imagen} alt={item.titulo} />

              <div className="info">
                <h3>{item.titulo}</h3>
                <p className="precio">₡{item.precio}</p>

                {/* CANTIDAD */}
                <div className="cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>

                {/* ELIMINAR */}
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOTÓN DE PAGO */}
      {carrito.length > 0 && (
        <div className="carrito-total">
          <button className="btn-pagar">Proceder al pago</button>
        </div>
      )}
    </div>
  );
}
