# 🏫 CollegeAtlas

A full-stack web application built using **React + Vite**, **Node.js**, and **PostgreSQL**, with **TypeScript** used on both frontend and backend.  
The project includes an organization list page with CRUD functionality and a detailed organization page displaying related users.

---

## 🌐 Hosted Links

- **Frontend (Netlify)**: https://interviewbuddy-fullstack-task.netlify.app  
- **Backend (Render)**: https://interviewbuddy-backend-a9c9.onrender.com
---

## ⚙️ Tech Stack

| Layer | Technology | Hosting |
|--------|-------------|----------|
| Frontend | React, Vite, TypeScript | **Netlify** |
| Backend | Node.js, Express, TypeScript | **Render** |
| Database | PostgreSQL | **Neon** |

---

## 🧩 Pages and Functionality

### 🗂️ Organization List Page
- Displays all organizations  
- Supports **CRUD** operations (Create, Read, Update, Delete)  
- Responsive and neatly organized layout

### 🏢 Organization Details Page
- Displays detailed information for a selected organization  
- Shows **organization users** and their related details

---

## ⚡ Setup Instructions (Local Development)

To run this project locally:

1. Clone the repository  
   `git clone https://github.com/suryakiran589/InterviewBuddy_full-stack_task`  
   `cd InterviewBuddy_full-stack_task`

2. In the **backend** folder:  
   - Run `npm install` to install dependencies  
   - Create a `.env` file and add:  
     ```
     DATABASE_URL=postgresql://user:password@host/db
     PORT=5000
     ```
   - Start the backend server using `npm run dev`

3. In the **frontend** folder:  
   - Run `npm install` to install dependencies  
   - Start the frontend using `npm run dev`

---

## 🏗️ Architecture

[ React + Vite (Netlify) ]
          ↓
[ Node + Express (Render) ]
          ↓
[ PostgreSQL (Neon) ]

---

## 👤 Developer

**Surya Kiran**  
Frontend & Backend Developer | TypeScript

