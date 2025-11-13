import React from "react";
import "../styles/footer.css";


export default function Footer() {
  return (
   <footer>
  <div className="footer-inner">
    <div className="footer-section">
      <h4>ReBook</h4>
      <a href="/">Inicio</a>
      <a href="/biblioteca">Biblioteca</a>
      <a href="/crear-libro">Crear Libro</a>
    </div>

    <div className="footer-section">
      <h4>Enlaces útiles</h4>
      <a href="/login">Iniciar sesión</a>
      <a href="/register">Registrarse</a>
    </div>

    <div className="footer-section">
      <h4>Contacto</h4>
      <a href="mailto:soporte@rebook.com">soporte@rebook.com</a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        Instagram
      </a>
    </div>
  </div>

  <div className="footer-divider"></div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} <span>ReBook</span>. Todos los derechos reservados.
  </div>
</footer>

  );
}
