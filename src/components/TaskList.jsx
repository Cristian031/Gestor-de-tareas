import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null); // Estado para la tarea que se está editando
  const [newTaskName, setNewTaskName] = useState(""); // Estado para el nuevo nombre de la tarea

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id)); // Eliminar tarea
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la tarea:", error);
      });
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    axios
      .put(`http://localhost:8080/tasks/${id}`, updatedTasks.find((task) => task.id === id))
      .then(() => setTasks(updatedTasks))
      .catch((error) => console.error("Hubo un error al actualizar la tarea:", error));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTaskName(task.name); // Prellenar el nombre de la tarea
  };

  const handleSaveEdit = () => {
    if (newTaskName.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, name: newTaskName } : task
      );

      axios
        .put(`http://localhost:8080/tasks/${editingTask.id}`, updatedTasks.find((task) => task.id === editingTask.id))
        .then(() => {
          setTasks(updatedTasks);
          setEditingTask(null); // Cerrar el modo de edición
          setNewTaskName(""); // Limpiar el campo
        })
        .catch((error) => {
          console.error("Hubo un error al guardar la edición:", error);
        });
    }
  };

  return (
    <div className="task-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                    />
                  ) : (
                    task.name
                  )}
                </td>
                <td>{task.completed ? "✔️ Completada" : "❌ Pendiente"}</td>
                <td>
                  <button onClick={() => toggleCompleted(task.id)}>
                    {task.completed ? "Desmarcar" : "Completar"}
                  </button>
                  {editingTask && editingTask.id === task.id ? (
                    <button onClick={handleSaveEdit}>Guardar</button>
                  ) : (
                    <button onClick={() => handleEdit(task)}>Editar</button>
                  )}
                <button onClick={() => deleteTask(task.id)}>🗑️ </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tareas disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
