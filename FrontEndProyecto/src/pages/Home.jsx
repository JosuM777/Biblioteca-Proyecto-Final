import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a <span className="brand">ReBook</span></h1>
          <p>Descubre, comparte y alquila libros con otros lectores.</p>
          <Link to="/catalog" className="btn-primary">Explorar Libros</Link>
        </div>
      </section>

      <section className="section destacados">
        <h2>Libros Destacados</h2>
        <div className="book-grid">
          <div className="book-card">
            <img src="/img/" alt="Libro destacado 1" />
            <h3>El Principito</h3>
            <p>Antoine de Saint-Exupéry</p>
          </div>
          <div className="book-card">
            <img src="/img/" alt="Libro destacado 2" />
            <h3>1984</h3>
            <p>George Orwell</p>
          </div>
          <div className="book-card">
            <img src="/img/" alt="Libro destacado 3" />
            <h3>Cien años de soledad</h3>
            <p>Gabriel García Márquez</p>
          </div>
        </div>
      </section>

      <section className="section generos">
        <h2>Géneros Populares</h2>
        <div className="genre-grid">
          <div className="genre">Ficción</div>
          <div className="genre">Ciencia</div>
          <div className="genre">Romance</div>
          <div className="genre">Comics</div>
          <div className="genre">Fantasía</div>
        </div>
      </section>

      <section className="section proximos">
        <h2>Próximos lanzamientos</h2>
        <div className="book-grid">
          <div className="book-card upcoming">
            <img src="/img/" alt="Próximo 1" />
            <h3>Nuevo Amanecer</h3>
            <p>Disponible pronto</p>
          </div>
          <div className="book-card upcoming">
            <img src="/img/" alt="Próximo 2" />
            <h3>Viaje al centro del alma</h3>
            <p>Disponible pronto</p>
          </div>
        </div>
      </section>
    </div>
  );
}
