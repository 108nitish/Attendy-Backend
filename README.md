# Attendy - Automated Attendance System (Backend)

## 📌 Overview
Attendy is a **smart attendance system** that allows teachers to automate student attendance using **facial recognition**. The backend is built using **Node.js, Express, and MongoDB**, handling authentication, class management, student records, and attendance processing.

## 🚀 Features
- 🔹 **User Authentication** (Signup/Login using JWT)
- 🔹 **Class Management** (Create, Update, Delete Classes)
- 🔹 **Student Management** (Add, Update, Remove Students)
- 🔹 **Automated Attendance** (Face Recognition using Face API.js & OpenCV)
- 🔹 **Secure Data Storage** (MongoDB)
- 🔹 **File Uploading** (Student Images for Recognition)
- 🔹 **Cross-Origin Support** (CORS Enabled)

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcrypt
- **Face Recognition:** Face API.js, OpenCV
- **File Handling:** Multer
- **Environment Variables:** Dotenv

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/attendy-backend.git
cd attendy-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000  # Backend server port
MONGO_URI=mongodb+srv://your_mongodb_uri  # MongoDB Connection String
JWT_SECRET=your_jwt_secret  # Secret for JWT Authentication
```

### 4️⃣ Start the Server
```sh
npm start
```
For development with auto-restart:
```sh
nodemon index.js
```

## 📂 Project Structure
```
backend/
│-- models/         # Database Models (User, Class, Student)
│-- routes/         # API Routes (Auth, Classes, Students, Attendance)
│-- controllers/    # Business Logic & Data Processing
│-- middleware/     # Authentication & Error Handling
│-- utils/          # Utility Functions (Face Recognition, JWT)
│-- uploads/        # Storage for Student Images
│-- index.js        # Main Entry Point
│-- package.json    # Dependencies & Scripts
```

## 🔗 API Endpoints (Example)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User signup |
| `/api/classes` | GET | Fetch all classes |
| `/api/students` | GET | Fetch all students |
| `/api/attendance` | POST | Upload image for attendance |

## ✨ Contributors
- **Your Name** ([@yourgithub](https://github.com/108nitish))
 

