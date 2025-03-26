# 📝 Task Manager Web App  

A **full-stack Task Manager** application that helps you stay organized by allowing you to **add, edit, complete, and delete tasks** effortlessly. Built using **React (frontend) and Node.js with Express (backend)**, with **data stored in `data.json`** inside the `server` folder.

## Features  
- **Add Tasks** – Create new tasks with a title and description.
- **Edit Tasks** – Modify existing tasks easily.
- **Status/Complete** – Update tasks as completed when done.
- **Delete Tasks** – Remove tasks you no longer need.
- **Persistent Storage** – Task data is stored in `data.json`.

## Deployment

Frontend: Deployed via Netlify – [Project Frontend](https://brilliant-naiad-d09ea5.netlify.app/)

Backend: Deployed via Render – [Project Backend](https://task-manager-oza9.onrender.com)


## 🛠️🔧  Installation & Setup  
### 1. Clone the Repository  
```sh
git clone https://github.com/Sanchitkanwar31/Task_manager
cd Task_manager
```

### 2. Install Dependencies  
Navigate to the `server` and `client` folders separately and install dependencies:

#### Backend Setup  
```sh
cd server
npm install
```

#### Frontend Setup  
```sh
cd ../client
npm install
```

### 3. Run the Application  
#### Start the Backend Server  
```sh
cd server
node index.js OR npx nodemon index.js
```
This will start the Express.js server on `http://localhost:8000`.

#### Start the Frontend  
```sh
cd ../client
npm start
```
This will launch the React app on `http://localhost:3000`.

## 🔗 API Endpoints  
| Method | Endpoint           | Description                |
|--------|-------------------|----------------------------|
| GET    | `/tasks`          | Fetch all tasks           |
| POST   | `/newtasks`       | Create a new task         |
| PUT    | `/updatetasks/:id`| Update task by ID         |
| DELETE | `/deltasks/:id`   | Delete task by ID         |

## ## 🧬 Testing the API  
You can test the API using:  
### Fetch All Tasks  
**Request:**  
```sh
GET http://localhost:8000/tasks
```
**Response:**  
```json
[
  {
    "id": "88346f1e-a30c-4a1d-9a41",
    "title": "Complete project",
    "description": "Finish the final task manager project",
    "status": false
  }
]
```

### Add a New Task  
**Request:**  
```sh
POST  http://localhost:8000/newtasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "This is a new task",
  "status": false
}
```
**Response:**  
```json
{
  "message": "Task added successfully!"
}
```

### Update a Task  
**Request:**  
```sh
PUT http://localhost:8000/updatetasks/id
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated task details",
  "status": true
}
```
**Response:**  
```json
{
  "message": "Task updated successfully!"
}
```

### Delete a Task  
**Request:**  
```sh
DELETE http://localhost:8000/deltasks/id
```
**Response:**  
```json
{
  "message": "Task deleted successfully!"
}
```


##  Screenshots  
- **Task List Page**   ![image](https://github.com/user-attachments/assets/d37b331c-0104-49a4-9532-3476642a836b)
- **Task Data.JSON**  ![image](https://github.com/user-attachments/assets/c0a93ac0-59d6-4dd7-841a-3a931d043326)


## Data Storage (`data.json`)  
All tasks are stored inside the `server/data.json` file in the following format:
```json
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "Complete the React tutorial",
    "status": false
  }
]
```
]

Since the data.json file in the GitHub repository has only two tasks, only these will be displayed. However, when connected to a cloud-based database or local storage, new tasks can be stored persistently. Currently, any changes made will only be reflected on the frontend page and will not be saved permanently.

## 📌 Contributing  
Want to improve this project? Feel free to fork the repository, make changes, and submit a pull request.

