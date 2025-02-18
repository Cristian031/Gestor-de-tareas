import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import TaskManager from "./components/TaskManager";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Cargar las tareas al iniciar la aplicación
    axios
      .get("http://localhost:8080/tasks")
      .then((response) => {
        setTasks(response.data); // Almacenar las tareas
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            {/* Rutas donde pasas el estado de tasks y setTasks */}
            <Route
              path="/"
              element={<TaskManager setTasks={setTasks} tasks={tasks} />}
            />
            <Route
              path="/listado-tareas"
              element={<TaskList tasks={tasks} setTasks={setTasks} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
