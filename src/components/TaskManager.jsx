import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../App.css";

const TaskManager = ({ setTasks, tasks = [] }) => {
  // Aseguramos que tasks sea un array por defecto
  const [taskName, setTaskName] = useState("");

  const addTask = (taskName) => {
    if (taskName.trim()) {
      const newTask = { name: taskName, completed: false };
      axios
        .post("http://localhost:8080/tasks", newTask)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]); // Usamos prevTasks para mantener el estado consistente
          setTaskName(""); // Limpiar el input
        })
        .catch((error) => {
          console.error("Hubo un error al agregar la tarea:", error);
        });
    } else {
      console.log("El nombre de la tarea no puede estar vacío");
    }
  };

  const handleAddTask = () => {
    addTask(taskName); // Llamar a la función para agregar la tarea
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tarea agregada con éxito",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'alerta-pequena',
      },
    });
  };

  return (
    <div className="manager-container">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
};

export default TaskManager;
