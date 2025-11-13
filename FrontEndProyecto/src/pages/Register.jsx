import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/register.css";



export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    num_telefono: '',
    direccion: '',
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/register/', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Registro exitoso');
      navigate('/login');
    } catch (err) {
      console.error('Error en el registro:', err);
      if (err.response && err.response.data) {
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        alert('No se pudo conectar al servidor');
      }
    }
  }

  return (
    <div className="register-page">
      <h1>Registro</h1>
      <form onSubmit={submit} className="register-form">
        <div className="form-field">
          <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <input name="first_name" placeholder="Nombre" value={form.first_name} onChange={handleChange} />
        </div>
        <div className="form-field">
          <input name="last_name" placeholder="Apellido" value={form.last_name} onChange={handleChange} />
        </div>
        <div className="form-field">
          <input name="num_telefono" placeholder="Teléfono" value={form.num_telefono} onChange={handleChange} />
        </div>
        <div className="form-field">
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        </div>
        <button className="btn" type="submit">Registrar</button>
      </form>
    </div>
  );
}
