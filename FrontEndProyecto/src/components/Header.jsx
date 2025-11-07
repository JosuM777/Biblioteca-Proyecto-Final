import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">ReBook</h1>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Registro</Link>
      </nav>
    </header>
  );
}
