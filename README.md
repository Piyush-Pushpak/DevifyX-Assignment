# 🛠️ Admin Dashboard Backend

A secure and modular backend for an Admin Dashboard built using **Node.js**, **Express.js**, and **MongoDB**.  
Includes user authentication, role-based access, product management, password handling, audit logging, Swagger documentation, and Docker setup.

---

## 🚀 Features

- ✅ User Authentication (JWT)
- ✅ Role-Based Access (admin, moderator, user)
- ✅ CRUD APIs for Users and Products
- ✅ Password Reset & Change (Mailtrap)
- ✅ Audit Logging (MongoDB)
- ✅ Rate Limiting
- ✅ Swagger API Documentation
- ✅ Dockerized Environment
- ✅ Search, Filtering & Pagination
- ✅ Environment-based configuration with `.env`

---

## 🧰 Tech Stack

- **Backend:** Node.js (v14+), Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + Bcrypt
- **Email:** Nodemailer + Mailtrap
- **Docs:** Swagger (OpenAPI)
- **Containerization:** Docker + Docker Compose

---

## 📁 Folder Structure

```
admin-dashboard-backend/
├── config/                   # DB connection
├── controllers/              # Business logic
├── middlewares/             # Auth, error, rate-limit
├── models/                  # Mongoose schemas
├── routes/                  # Express routes
├── utils/                   # Email, audit log
├── swagger/                 # swagger.yaml
├── .env                     # Local secrets (not committed)
├── .env.example             # Safe config template ✅
├── .gitignore               # Git exclusions
├── Dockerfile               # Docker image setup
├── docker-compose.yml       # Docker services
├── README.md                # 📄 You are here
├── app.js                   # App configuration
└── server.js                # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/admin-dashboard-backend.git
cd admin-dashboard-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file by copying:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI, JWT secret, and Mailtrap credentials.

---

## 🔐 Running the Server

### Option 1: Local Dev Server

```bash
npm run dev
```

- Server: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/api-docs`

---

### Option 2: Docker (Recommended)

```bash
docker compose up --build
```

This runs:
- Express app on port 5000
- MongoDB container
- Environment is loaded from `docker-compose.yml`

---

## 📘 Swagger API Docs

Interactive API docs available at:

📎 [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)

Includes:
- Registration & Login
- Password Reset & Change
- User & Product CRUD
- Role-based endpoints

---

## 🧪 Postman Collection

✅ File: `AdminDashboard.postman_collection.json`  
→ Import this in Postman to test all endpoints.

---

## 🗃️ Database Schema Definitions

### 👤 User Schema
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required)
- `role`: String ('admin' | 'moderator' | 'user', default: user)
- `resetToken`: String (optional, for reset)
- `resetTokenExpire`: Date (optional)
- `timestamps`: createdAt, updatedAt

### 📦 Product Schema
- `name`: String (required)
- `description`: String (required)
- `price`: Number (required)
- `category`: String (required)
- `stock`: Number (default: 0)
- `timestamps`: createdAt, updatedAt

### 📜 AuditLog Schema
- `user`: ObjectId (ref to `User`)
- `action`: String (e.g. "delete user")
- `description`: String
- `method`: String (e.g. GET, POST)
- `path`: String (route path)
- `ip`: String (request IP)
- `createdAt`: Date

---

## ✅ Assignment Compliance

| Requirement                            | Status |
|----------------------------------------|--------|
| Node.js (v14+) with Express.js         | ✅     |
| MongoDB with Mongoose                  | ✅     |
| RESTful API Design                     | ✅     |
| .env Configuration                     | ✅     |
| Swagger/OpenAPI Documentation          | ✅     |
| Role-based Access Control              | ✅     |
| Email Notification (Mailtrap)          | ✅     |
| Rate Limiting                          | ✅     |
| Audit Logging                          | ✅     |
| Docker Support                         | ✅     |
| Modular, Clean Code                    | ✅     |
| Git Repository                         | ✅     |
| README Setup Instructions              | ✅     |
| Bonus: MFA, Unit Tests                 | ❌ Optional (not implemented) |

---

## ✍️ Author

**Piyush Pushpak**  
_Developed for the Admin Dashboard Backend Assignment_

---

## 📜 License

This project is intended for academic and learning purposes only.
