const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8000;
const datafile = "./data.json";

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins

// Helper functions
const getTasks = () => {
  try {
    const data = fs.readFileSync(datafile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(datafile, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

// Get all tasks
app.get("/tasks", (req, res) => {
  return res.json(getTasks());
});

// ✅ Add a new task with UUID
app.post("/newtasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || status === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let tasks = getTasks();
  let newTask = { id: uuidv4(), title, description, status };
  tasks.push(newTask);
  saveTasks(tasks);

  return res.status(201).json({ message: "Task added successfully", task: newTask });
});

// ✅ Update task by UUID
app.put("/updatetasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || status === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let tasks = getTasks();
  let index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[index] = { id, title, description, status };
  saveTasks(tasks);

  return res.json({ message: "Task updated successfully", task: tasks[index] });
});

// ✅ Delete task by UUID
app.delete("/deltasks/:id", (req, res) => {
  const { id } = req.params;
  let tasks = getTasks();
  let updatedTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === updatedTasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  saveTasks(updatedTasks);
  return res.json({ message: "Task deleted successfully", tasks: updatedTasks });
});

// Home endpoint
app.get("/", (req, res) => {
  res.send("<h1>Task Management API</h1><p>Use the API endpoints to manage tasks.</p>");
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:8000`);
});
