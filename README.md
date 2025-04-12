# 📌 Task Management API
- A RESTful API for managing tasks built with Node.js, Express, and MongoDB, developed as part of the EB Pearls Backend Traineeship 2025 assignment.

## 🚀 Live Demo
- Base URL: https://taskmanagement-1yg0.onrender.com/api/task

## 🧰 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- Joi (for validation)
- Render (for deployment)

## ⚙️ Setup Instructions

### 🧪 Local Development
1. Clone the repository
   git clone https://github.com/AnjitGC741/taskManagement.git
   cd taskManagement

2. Install dependencies
   npm install

3. Create environment variables
   cp .env.example .env

4. Run the development server
   npm run dev

🌐 API Endpoints
   Base URL: /api/task

  1. POST /task/create
    Create a new task.  
    Request Body:

    {
      "title": "Finish Assignment",
      "description": "Complete the backend traineeship task",
      "status": "pending"
    }

  3.  GET /task
     Get all tasks with optional filtering, pagination, and sorting.
     Query Parameters:
     page (default: 1)
     limit (default: 10)
     status (optional: pending, in-progress, completed)
     sortBy (e.g. createdAt)
     order (asc or desc)

  Example:
  /task?limit=5&page=2&status=pending&sortBy=createdAt&order=desc

  3. GET /task/:id
    Get a single task by its ID.
  
  4. PUT /task/:id
    Update the entire task.
    Request Body:

    {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "status": "in-progress"
    }
    
  6. DELETE /task/:id
    Delete a task by ID.

  7. PATCH /task/status/:id
    Update only the status of a task.
    Request Body:

    {
      "status": "completed"
    }
    
## 🧾 MongoDB Schema
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
      createdAt: { type: Date, default: Date.now }
    }
## ✅ Input Validation (Joi)
    title: required string
    description: required string
    status: optional string, must be one of pending, in-progress, or completed

## 🌍 Deployment
  The API is deployed on Render:
  https://taskmanagement-1yg0.onrender.com/api/task

## 📄 .env.example
PORT=5000
MONGODB_URI=mongodb+srv://anjitgc:anzzit*****@cluster0.dssrlm6.mongodb.net/Tasks

## 📤 Submission
   Deployed URL: https://taskmanagement-1yg0.onrender.com/api/task

Collaborators invited:
    hr@ebpearls.com.au
    ray@ebpearls.com.au

## 📊 Features Summary
  ✅ Create, read, update, and delete tasks </br>
  ✅ Get tasks with filters, pagination, and sorting </br>
  ✅ Validate user inputs using Joi </br>
  ✅ RESTful routing with modular code structure </br>
  ✅ PATCH endpoint for updating status only </br>
  ✅ Deployed online and ready to use </br>

## 👨‍💻 Author
GitHub: AnjitGC741
