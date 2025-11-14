import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login/", form);

      // Guarda usuario completo
      localStorage.setItem("usuario", JSON.stringify(res.data));

      alert("Inicio de sesión exitoso 🔥");
      navigate("/account");
    } catch (error) {
      alert("Credenciales incorrectas");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
