import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "PUT" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Save edited task
  const saveTask = async (id) => {
    if (!editingTitle.trim()) return;
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle }),
      });
      setEditingTaskId(null);
      setEditingTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{
      maxWidth: 500,
      margin: "3rem auto",
      padding: "2rem",
      textAlign: "center",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>My Todo App</h1>

      {/* Input + Add Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          style={{
            padding: "0.5rem",
            width: "70%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "0.5rem"
          }}
        />
        <button
          onClick={addTask}
          disabled={!title.trim()}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "white",
            cursor: title.trim() ? "pointer" : "not-allowed"
          }}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            padding: "0.5rem",
            borderRadius: "5px",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{
                    flexGrow: 1,
                    marginRight: "0.5rem",
                    padding: "0.3rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                  }}
                />
                <button
                  onClick={() => saveTask(task.id)}
                  style={{
                    marginRight: "0.3rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#4caf50",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditingTaskId(null); setEditingTitle(""); }}
                  style={{
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#f44336",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditingTitle(task.title);
                  }}
                  style={{
                    flexGrow: 1,
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer"
                  }}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginLeft: "0.5rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#f44336",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
