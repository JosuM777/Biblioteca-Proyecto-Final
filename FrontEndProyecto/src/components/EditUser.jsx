import React from 'react';

const EditarPerfil = () => {
    return (
        <div className="editar-perfil">
            <nav className="navbar">
                <ul>
                    <li>Alquilar Libros</li>
                    <li>Tus Libros</li>
                    <li>Ayuda</li>
                    <li className="activo">Perfil</li>
                </ul>
            </nav>

            <div className="contenido">
                <div className="foto-perfil">
                    <div className="foto-placeholder">Foto de perfil</div>
                </div>

                <form className="formulario">
                    <h2>Editar Perfil</h2>

                    <label htmlFor="nombre">Nombre:</label>
                    <input id="nombre" type="text" defaultValue="Josué" />

                    <label htmlFor="apellido">Apellido:</label>
                    <input id="apellido" type="text" defaultValue="Munguía" />

                    <label htmlFor="correo">Correo electrónico:</label>
                    <input id="correo" type="email" defaultValue="correoelectronico@gmail.com" />

                    <label htmlFor="mensaje">Tu mensaje:</label>
                    <textarea id="mensaje" placeholder="Escribe tu pregunta o mensaje" />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarPerfil;