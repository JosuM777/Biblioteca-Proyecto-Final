import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route path="/account" element={<MiCuenta />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/libro/:id" element={<LibroDetalle />} />
      <Route path="/crear" element={<CrearLibro />} />
      <Route path="/editar/:id" element={<EditarLibro />} />
    </Routes>
  );
}
