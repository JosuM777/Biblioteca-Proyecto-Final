import React from "react";

export default function LibroForm({ libro, setLibro, onSubmit, textoBoton }) {
  const handleChange = e => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  return (
    <form className="form-libro" onSubmit={onSubmit}>
      <input name="titulo" value={libro.titulo} onChange={handleChange} placeholder="Título" />
      <input name="autor" value={libro.autor} onChange={handleChange} placeholder="Autor" />
      <input name="precio" value={libro.precio} onChange={handleChange} placeholder="Precio" />
      <input name="img" value={libro.img} onChange={handleChange} placeholder="URL Imagen" />
      <input name="genero" value={libro.genero} onChange={handleChange} placeholder="Género" />
      <textarea name="descripcion" value={libro.descripcion} onChange={handleChange} placeholder="Descripción" />

      <button>{textoBoton}</button>
    </form>
  );
}
