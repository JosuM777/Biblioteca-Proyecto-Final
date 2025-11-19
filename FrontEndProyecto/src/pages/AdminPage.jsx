import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/AdminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-layout">
      
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <ul>
            <li><Link to="/admin/dashboard">📊 Dashboard</Link></li>
            <li><Link to="/admin/usuarios">👤 Usuarios</Link></li>
            <li><Link to="/admin/libros">📚 Libros</Link></li>
            <li><Link to="/admin/historial">📜 Historial</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
