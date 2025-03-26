import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";// Backend URL

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: false });
  const [editTaskId, setEditTaskId] = useState(null);

  // get all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // new task
  const handleCreate = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Title and Description are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/newtasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchTasks();
        setNewTask({ title: "", description: "", status: false });
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // update task
  const handleUpdate = async (id) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;

    try {
      await fetch(`${API_URL}/updatetasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskToUpdate, status: true }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // delete task
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/deltasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit mode
  const handleEditClick = (id) => {
    setEditTaskId(id);
  };

  // save edit
  const handleSaveEdit = async (id) => {
    const title = document.getElementById(`title-${id}`).value;
    const description = document.getElementById(`desc-${id}`).value;

    try {
      await fetch(`${API_URL}/updatetasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: tasks.find(task => task.id === id).status }),
      });

      fetchTasks();
      setEditTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Task Manager</h2>

      {/* Task Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded-md mb-2 focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleCreate}
          className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ol className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            {editTaskId === task.id ? (
              <>
                <div className="flex-1">
                  <input id={`title-${task.id}`} defaultValue=<strong>{task.title}</strong> className="border p-1 rounded-md w-full mb-2" style={{ fontWeight: "bold" }} />
                  <input id={`desc-${task.id}`} defaultValue={task.description} className="border p-1 rounded-md w-full" />
                </div>
                <button onClick={() => handleSaveEdit(task.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save</button>
                <button onClick={() => setEditTaskId(null)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{task.title}</p>
                  <p className="text-gray-600">{task.description}</p>
                  <p className={`text-sm font-semibold ${task.status ? "text-green-500" : "text-yellow-500"}`}>
                    {task.status ? "✅ Completed" : "⏳ Pending"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(task.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
