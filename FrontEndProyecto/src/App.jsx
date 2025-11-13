import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditarUsuario from './pages/EditarUsuario';
import CrearLibro from "./components/CrearLibro";
import Biblioteca from "./pages/Biblioteca";


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
            <Route path="/EditarUsuario" element={<EditarUsuario />} />
            <Route path="/crearlibro" element={<CrearLibro />} />
            <Route path="/biblioteca" element={<Biblioteca />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
