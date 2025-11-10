import React from 'react';

const LibrosAlquilados = ({ libros }) => {
    return (
        <div className="libros-alquilados">
            <h2>Tus libros alquilados</h2>
            <div className="grid-libros">
                {libros.map((libro, index) => (
                    <div key={index} className="tarjeta-libro">
                        <img src={libro.imagen} alt={libro.titulo} />
                        <h3>{libro.titulo}</h3>
                        <p>{libro.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibrosAlquilados;