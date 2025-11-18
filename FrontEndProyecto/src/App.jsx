import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Biblioteca from "./pages/Biblioteca";
import CrearLibro from "./components/CrearLibro";
import MiCuenta from "./pages/MiCuenta";
import EditarPerfil from "./components/EditarPerfil";
import AdminPage from "./pages/AdminPage";
import LibroDetalle from "./pages/LibroDetalle";
import EditarLibro from "./components/EditarLibro";


export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/crear-libro" element={<CrearLibro />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/account" element={<MiCuenta />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/libro/:id" element={<LibroDetalle />} />
            <Route path="/crear" element={<CrearLibro />} />
            <Route path="/editar/:id" element={<EditarLibro />} />
            <Route path="/admin/editar/:id" element={<EditarLibro />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
