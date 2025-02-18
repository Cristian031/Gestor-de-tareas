import React from "react";
import "../App.css";
import logo from "../assets/logo.jpg"; 

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <h2>Gestor de Tareas</h2>
    </nav>
  );
}

export default Navbar;
