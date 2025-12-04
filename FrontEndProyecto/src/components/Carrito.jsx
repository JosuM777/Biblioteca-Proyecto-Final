import React, { useEffect, useState } from "react";
import "../styles/carrito.css";

export default function Carrito() {
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);

  // Usuario actual
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Clave estable del carrito
  const carritoKey = usuario ? `carrito_${usuario.id}` : "carrito_guest";

  // Cargar carrito automáticamente
  useEffect(() => {
    const cargarCarrito = () => {
      const carritoLocal = JSON.parse(localStorage.getItem(carritoKey)) || [];
      setCarrito(carritoLocal);
      setLoading(false);
    };

    cargarCarrito();

    // Actualizar cuando vuelves a la pestaña
    window.addEventListener("focus", cargarCarrito);

    // Actualizar cuando otro componente modifique carrito
    const syncManual = () => cargarCarrito();
    window.addEventListener("storageUpdate", syncManual);

    return () => {
      window.removeEventListener("focus", cargarCarrito);
      window.removeEventListener("storageUpdate", syncManual);
    };
  }, [carritoKey]);

  // Guardar cambios y notificar a Header
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(carritoKey, JSON.stringify(nuevoCarrito));

    // Avisar a Header para que actualice el contador
    window.dispatchEvent(new Event("storageUpdate"));
  };

  // Aumentar cantidad
  const aumentarCantidad = (id) => {
    const nuevo = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    guardarCarrito(nuevo);
  };

  // Disminuir cantidad
  const disminuirCantidad = (id) => {
    const nuevo = carrito
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item
      );
    guardarCarrito(nuevo);
  };

  // Eliminar item
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

                <div className="cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>

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

      {carrito.length > 0 && (
        <div className="carrito-total">
          <button className="btn-pagar">Proceder al pago</button>
        </div>
      )}
    </div>
  );
}
