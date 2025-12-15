import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/carrito.css";

export default function Carrito() {
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [mostrarPago, setMostrarPago] = useState(false);

  // Usuario actual
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  // Clave estable del carrito
  const carritoKey = usuario ? `carrito_${usuario.id}` : "carrito_guest";
  // Cargar carrito
  useEffect(() => {
    const cargarCarrito = () => {
      const carritoLocal = JSON.parse(localStorage.getItem(carritoKey)) || [];
      setCarrito(carritoLocal);
      setLoading(false);
    };

    cargarCarrito();
// Sincronizar en foco y cambios externos
    window.addEventListener("focus", cargarCarrito);
    const syncManual = () => cargarCarrito();
    window.addEventListener("storageUpdate", syncManual);

    return () => {
      window.removeEventListener("focus", cargarCarrito);
      window.removeEventListener("storageUpdate", syncManual);
    };
  }, [carritoKey]);

  // Guardar carrito
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(carritoKey, JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("storageUpdate"));
  };

  const aumentarCantidad = (id) => {
    const nuevo = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    guardarCarrito(nuevo);
  };

  const disminuirCantidad = (id) => {
    const nuevo = carrito.map((item) =>
      item.id === id
        ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
        : item
    );
    guardarCarrito(nuevo);
  };

  const eliminarItem = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevo);
  };

  // FUNCION PARA PROCESAR EL PAGO Y GUARDAR EN BACKEND
  const procesarPago = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para completar la compra.");
      return;
    }

    try {
      for (const item of carrito) {
        await axios.post("http://127.0.0.1:8000/api/carrito/", {
          usuario: usuario.id,
          libro: item.id,
          cantidad: item.cantidad,
        });
      }

      alert("¡Compra realizada con éxito!");

      // Limpiar carrito
      localStorage.removeItem(carritoKey);
      setCarrito([]);
      setMostrarPago(false);

      window.dispatchEvent(new Event("storageUpdate"));
    } catch (error) {
      console.error("Error al procesar compra:", error);
      alert("Hubo un error procesando el pago.");
    }
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
          <button className="btn-pagar" onClick={() => setMostrarPago(true)}>
            Proceder al pago
          </button>
        </div>
      )}

      {mostrarPago && (
        <div className="pago-formulario">
          <h2>Formulario de Pago</h2>

          <form
            className="form-pago"
            onSubmit={(e) => {
              e.preventDefault();
              procesarPago();
            }}
          >
            <label>Nombre completo</label>
            <input type="text" placeholder="Tu nombre" required />

            <label>Correo electrónico</label>
            <input type="email" placeholder="tucorreo@email.com" required />

            <label>Número de tarjeta</label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              maxLength="16"
              required
            />

            <div className="fila">
              <div>
                <label>Expiración</label>
                <input type="text" placeholder="MM/AA" maxLength="5" required />
              </div>

              <div>
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="***"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <button className="btn-confirmar">Confirmar pago</button>

            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setMostrarPago(false)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
