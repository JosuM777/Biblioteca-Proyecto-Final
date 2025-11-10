import React from 'react';
import EditarPerfil from '../components/EditUser';
import LibrosAlquilados from '../components/LibrosAlquilados';

function VistaEditarUsuario() {
    return (
        <div>
            <EditarPerfil />
            <LibrosAlquilados />
        </div>
    );
}

export default VistaEditarUsuario;