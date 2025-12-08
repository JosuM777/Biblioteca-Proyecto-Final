import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import axios from "axios";

export default function Home() {
  const [libros, setLibros] = useState([]);
  const [destacados, setDestacados] = useState([]);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/libros/")
      .then(res => {
        setLibros(res.data.slice(0, 10)); // primeros 10 libros
      })
      .catch(err => console.error("Error cargando libros", err));
  }, []);

  useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/libros/")
    .then(res => {
      setLibros(res.data.slice(0, 10));
    })
    .catch(err => console.error("Error cargando libros", err));

  axios.get("http://127.0.0.1:8000/api/usuarios/")
    .then(res => {
      const destacadosFiltrados = res.data.filter(
        u => u.rol === "autor" || u.rol === "usuario"
      );

      setDestacados(destacadosFiltrados);
    })
    .catch(err => console.error("Error usuarios", err));
}, []);


  return (
    <div className="home-nuevo">
      {/*HERO*/}
      <section className="hero-nuevo">
        <div className="hero-content">
          <h1 className="title">
            Descubre tu <span>próximo libro favorito</span>
          </h1>
          <p className="subtitle">
            Explora miles de libros, renta, compra o intercambia con otros lectores.
          </p>

          <div className="search-container">
            <input type="text" placeholder="Buscar libros, autores o géneros..." />
            <button>Buscar</button>
          </div>

          <div className="hero-buttons">
            <Link to="/biblioteca" className="btn-primary">Explorar</Link>
            <Link to="/account" className="btn-secondary">Mi Perfil</Link>
          </div>
        </div>
      </section>

      {/*GÉNEROS*/}
      <section className="seccion">
        <h2 className="titulo-seccion">Géneros Populares</h2>

        <div className="genres-carousel">
          {["Fantasía", "Romance", "Ciencia Ficción", "Misterio", "Comics", "Terror", "Histórico"]
            .map((g, i) => (
              <div key={i} className="genre-pill">
                {g}
              </div>
            ))}
        </div>
      </section>

      {/*  CARRUSEL PRINCIPAL*/}
      <section className="seccion">
        <h2 className="titulo-seccion">Recomendados</h2>

        <div className="carousel-nuevo">
          {libros.map(libro => (
            <Link to={`/libro/${libro.id}`} key={libro.id} className="item-card">
              <img src={libro.imagen} alt={libro.titulo} />
              <div className="item-info">
                <h3>{libro.titulo}</h3>
                <p>{libro.autor_o_editorial}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

{/* USUARIOS DESTACADOS */}
<section className="seccion">
  <h2 className="titulo-seccion">Usuarios Destacados</h2>

  <div className="usuarios-carousel">
    {destacados.map(user => (
      <Link
        to={`/usuario/${user.id}`}
        key={user.id}
        className="usuario-card"
      >
        <img
          src={user.foto_perfil}
          alt={user.username}
          className="usuario-img"
        />

        <h3>{user.username}</h3>
        <p className="rol">{user.rol}</p>
      </Link>
    ))}
  </div>
</section>

    </div>
  );
}
