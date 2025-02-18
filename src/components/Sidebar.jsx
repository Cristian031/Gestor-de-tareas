import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Gestión de Tareas</Link>
        </li>
        <li>
          <Link to="/listado-tareas">Listado de Tareas</Link>
        </li>
      </ul>
      <p>Información legal | Política de privacidad<br />© 2025 All rights reserved<br />| Creator: Magallanes Cristian</p>
    </aside>
  );
};

export default Sidebar;
