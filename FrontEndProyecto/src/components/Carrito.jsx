import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Carrito() {
    const [carrito, setCarrito] = useState(null);
    const [count, setCount] = useState(0);

    const fetchCarrito = async () => {
        const res = await axios.get("http://localhost:8000/api/carrito/", {
            withCredentials: true
        });
        setCarrito(res.data);
        setCount(res.data.items?.length || 0); // actualiza el conteo desde la respuesta
    };

    const eliminarItem = async (id) => {
        await axios.delete(`http://localhost:8000/api/carrito/eliminar/${id}/`);
        fetchCarrito();
    };

    useEffect(() => {
        fetchCarrito();
    }, []);

    if (!carrito) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Carrito</h1>

            {carrito.items.map(item => (
                <div key={item.id}>
                    <p>{item.libro.titulo} ({item.cantidad})</p>
                    <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
                </div>
            ))}

            <Link to="/carrito">
                🛒 {count}
            </Link>

            <h2>Total: ₡{carrito.total}</h2>
        </div>
    );
}
