import React, { useState } from "react";
import axios from "axios";
import "../styles/mantenimiento.css";

// IMPORTAR IMÁGENES
import iconLimpieza from "../img/Limpiezas del Sistema.png";
import iconBD from "../img/Base de Datos.png";
import iconRestauracion from "../img/Restauraciones.png";
import iconSeguridad from "../img/Seguridad.png";
import iconModo from "../img/Modo Mantenimiento.png";

export default function Mantenimiento() {
  const [loading, setLoading] = useState(false);

  const confirmar = async (mensaje, accion) => {
    if (!window.confirm(mensaje)) return;

    try {
      setLoading(true);
      await accion();
      alert("Operación realizada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error ejecutando la operación");
    } finally {
      setLoading(false);
    }
  };

  // FUNCIONES
  const limpiarHistorial = () =>
    confirmar("¿Seguro que deseas borrar todo el historial de alquileres?", () =>
      axios.delete("http://localhost:8000/historial/")
    );

  const resetLibros = () =>
    confirmar("¿Restaurar TODOS los libros a valores iniciales?", () =>
      axios.post("http://localhost:8000libros/")
    );

  const resetUsuarios = () =>
    confirmar("¿Restaurar TODOS los usuarios? (excepto admin)", () =>
      axios.post("http://localhost:8000/usuarios/")
    );

  const limpiarCache = () =>
    confirmar("¿Deseas limpiar la caché del servidor?", () =>
      axios.post("http://localhost:8000/clear/")
    );

  const optimizarBD = () =>
    confirmar("¿Deseas optimizar la base de datos?", () =>
      axios.post("http://localhost:8000/optimize/")
    );

  const borrarImagenesHuerfanas = () =>
    confirmar("¿Eliminar imágenes no asociadas a ningún libro/usuario?", () =>
      axios.delete("http://localhost:8000/cleanup/")
    );

  const cerrarTodasSesiones = () =>
    confirmar("¿Cerrar sesión a todos los usuarios?", () =>
      axios.post("http://localhost:8000/logout_all/")
    );

  const activarModoMantenimiento = () =>
    confirmar("¿Activar el modo mantenimiento?", () =>
      axios.post("http://localhost:8000/activate/")
    );

  const desactivarModoMantenimiento = () =>
    confirmar("¿Desactivar el modo mantenimiento?", () =>
      axios.post("http://localhost:8000/deactivate/")
    );

  const backupBD = () =>
    confirmar("¿Generar un respaldo completo de la base de datos?", () =>
      axios.get("http://localhost:8000/backup/")
    );

  return (
    <div className="admin-container" style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Panel de Mantenimiento</h1>

      {loading && (
        <p style={{ color: "blue", textAlign: "center" }}>
          Procesando...
        </p>
      )}

      <div className="maint-grid">

        <h2>
          <img src={iconLimpieza} className="maint-title-icon" />
          Limpiezas del Sistema
        </h2>

        <button className="maint-btn" onClick={limpiarHistorial}>
          Borrar historial de alquileres
        </button>

        <button className="maint-btn" onClick={limpiarCache}>
          Limpiar caché del sistema
        </button>

        <button className="maint-btn" onClick={borrarImagenesHuerfanas}>
          Eliminar imágenes huérfanas
        </button>

        <h2>
          <img src={iconBD} className="maint-title-icon" />
          Base de Datos
        </h2>

        <button className="maint-btn" onClick={optimizarBD}>
          Optimizar Base de Datos
        </button>

        <button className="maint-btn" onClick={backupBD}>
          Generar Backup de la Base de Datos
        </button>

        <h2>
          <img src={iconRestauracion} className="maint-title-icon" />
          Restauraciones
        </h2>

        <button className="maint-btn" onClick={resetLibros}>
          Restaurar libros a valores iniciales
        </button>

        <button className="maint-btn" onClick={resetUsuarios}>
          Restaurar usuarios (excepto admin)
        </button>

        <h2>
          <img src={iconSeguridad} className="maint-title-icon" />
          Seguridad
        </h2>

        <button className="maint-btn" onClick={cerrarTodasSesiones}>
          Cerrar sesión a TODOS los usuarios
        </button>

        <h2>
          <img src={iconModo} className="maint-title-icon" />
          Modo Mantenimiento
        </h2>

        <button className="maint-btn" onClick={activarModoMantenimiento}>
          Activar modo mantenimiento
        </button>

        <button className="maint-btn" onClick={desactivarModoMantenimiento}>
          Desactivar modo mantenimiento
        </button>

      </div>
    </div>
  );
}
