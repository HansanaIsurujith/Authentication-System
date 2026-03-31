# Authentication System Backend

This repository contains a robust and secure authentication backend built with Node.js, Express, MongoDB, and JSON Web Tokens (JWT). It provides the foundational user management features needed for modern web applications.

## 🚀 Features

- **User Registration**: Securely register new users with password hashing capabilities via `bcrypt`.
- **User Authentication**: Login functionality that issues JSON Web Tokens (JWT) for secure session management.
- **Protected Routes**: Middleware to safeguard routes and ensure that only authenticated users with valid tokens can access certain endpoints.
- **RESTful API Architecture**: Standardized endpoints returning consistent JSON responses.
- **Error Handling**: Centralized error handling middleware.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: Custom JWT (JSON Web Tokens)
- **Security**: `bcrypt` for password hashing, `cors` for Cross-Origin Resource Sharing.

## 📦 Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v14 or higher recommended)
- MongoDB (running locally or a MongoDB Atlas URI)

## 🔧 Installation & Setup

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd "MTIT Project/Authentication-System"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables Config**:
   Create a `.env` file in the root directory and add the following mapping:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=30d
   ```

4. **Start the server**:
   - For development (with auto-restart via nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

   The server will run on `http://localhost:5000` (or your defined `PORT`).

## 📚 API Endpoints

### 1. Register a User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword123"
  }
  ```
- **Success Response** `201 Created`:
  ```json
  {
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### 2. Login a User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates a user and returns a token.
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword123"
  }
  ```
- **Success Response** `200 OK`:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### 3. Protected Route Profile
- **Endpoint**: `GET /api/auth/profile`
- **Description**: An example of a protected route accessed via JWT.
- **Headers Needed**:
  - `Authorization`: `Bearer <your_jwt_token>`
- **Success Response** `200 OK`:
  ```json
  {
    "message": "Protected route accessed",
    "user": {
      "id": "60f...",
      "username": "johndoe"
    }
  }
  ```

## ✒️ Author
- Hansana Isurujith

## 📄 License
This project is licensed under the ISC License.
