import React from "react";
import "../styles/LibroCard.css";

export default function LibroCard({ libro, onClick }) {
  return (
    <div className="libro-card" onClick={onClick}>
      <img src={libro.img} alt={libro.titulo} className="libro-img" />

      <h3>{libro.titulo}</h3>
      <p>{libro.autor}</p>
      <strong>₡{libro.precio}</strong>
    </div>
  );
}
