import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

export default function Login() {
  const [form] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/token/", form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      navigate("/");
    } catch (err) {
      alert("Inicio de Sesion fallido");
      console.error(err);
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Correo o usuario"
          />
          <input
            type="password"
            placeholder="Contraseña"
          />
          <button type="submit">Entrar</button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
