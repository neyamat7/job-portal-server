# 🚀 Job Portal Backend API

A RESTful API for a job portal application built with Node.js, Express.js, and MongoDB. This API allows users to register, login, and manage job postings.

## 🔗 Base URL

```
https://job-portal-server-8wv0.onrender.com/
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Features

- User registration and authentication
- JWT-based authentication
- Job posting, viewing, updating, and deletion
- User-specific job management
- Secure password hashing
- CORS enabled for frontend integration

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User

- **POST** `/api/auth/register`
- **Description:** Register a new user
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response:**

```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User

- **POST** `/api/auth/login`
- **Description:** Login an existing user
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response:**

```json
{
  "ok": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Get Current User

- **GET** `/api/auth/me`
- **Description:** Get current logged-in user information
- **Headers:** `Authorization: Bearer <token>`
- **Response:**

```json
{
  "ok": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Logout User

- **POST** `/api/auth/logout`
- **Description:** Logout user (clears cookies)
- **Response:**

```json
{
  "ok": true
}
```

### Job Routes (`/api/jobs`)

#### Post a Job

- **POST** `/api/jobs/post`
- **Description:** Create a new job posting
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "title": "Website Design",
  "salaryRange": "$1,200 - $1,400",
  "jobType": "Fixed Price Project",
  "description": "Looking for a skilled web designer...",
  "categories": ["Web Design", "UI/UX"],
  "jobLevel": "Mid",
  "remoteOrOnsite": "Remote",
  "freelancerCount": 2
}
```

- **Response:**

```json
{
  "message": "Job posted successfully",
  "job": {
    "_id": "job_id",
    "title": "Website Design",
    "salaryRange": "$1,200 - $1,400",
    "jobType": "Fixed Price Project",
    "description": "Looking for a skilled web designer...",
    "categories": ["Web Design", "UI/UX"],
    "jobLevel": "Mid",
    "remoteOrOnsite": "Remote",
    "freelancerCount": 2,
    "postedBy": "user_id",
    "datePosted": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Jobs

- **GET** `/api/jobs/all`
- **Description:** Get all job postings
- **Headers:** `Authorization: Bearer <token>`
- **Response:**

```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Website Design",
      "salaryRange": "$1,200 - $1,400",
      "jobType": "Fixed Price Project",
      "description": "Looking for a skilled web designer...",
      "categories": ["Web Design", "UI/UX"],
      "jobLevel": "Mid",
      "remoteOrOnsite": "Remote",
      "freelancerCount": 2,
      "postedBy": "user_id",
      "datePosted": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Jobs by User

- **GET** `/api/jobs/user`
- **Description:** Get all jobs posted by the current user
- **Headers:** `Authorization: Bearer <token>`
- **Response:**

```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Website Design",
      "salaryRange": "$1,200 - $1,400",
      "jobType": "Fixed Price Project",
      "description": "Looking for a skilled web designer...",
      "categories": ["Web Design", "UI/UX"],
      "jobLevel": "Mid",
      "remoteOrOnsite": "Remote",
      "freelancerCount": 2,
      "postedBy": {
        "_id": "user_id",
        "email": "user@example.com"
      },
      "datePosted": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Update a Job

- **PATCH** `/api/jobs/:id`
- **Description:** Update a specific job (only by job owner)
- **Headers:** `Authorization: Bearer <token>`
- **URL Parameter:** `id` - Job ID
- **Body:** (any fields you want to update)

```json
{
  "title": "Updated Website Design",
  "salaryRange": "$1,500 - $1,800",
  "description": "Updated description..."
}
```

- **Response:**

```json
{
  "message": "Job updated successfully",
  "job": {
    "_id": "job_id",
    "title": "Updated Website Design",
    "salaryRange": "$1,500 - $1,800"
    // ... other job fields
  }
}
```

#### Delete a Job

- **DELETE** `/api/jobs/delete/:id`
- **Description:** Delete a specific job (only by job owner)
- **Headers:** `Authorization: Bearer <token>`
- **URL Parameter:** `id` - Job ID
- **Response:**

```json
{
  "message": "Job deleted successfully"
}
```

## 🗂️ Data Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String (optional),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  datePosted: Date (default: now),
  salaryRange: String (required),
  jobType: String (required),
  description: String (required),
  categories: Array of Strings,
  jobLevel: String (enum: ["Junior", "Mid", "Senior"]),
  remoteOrOnsite: String (enum: ["Remote", "Onsite"]),
  freelancerCount: Number (required),
  postedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection with allowed origins
- Input validation
- User authorization for job operations

## 📝 Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
COOKIE_NAME=your_cookie_name
NODE_ENV=production
CORS_ORIGIN=your_frontend_url
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start the server: `npm start`

## 📮 CORS Configuration

The API is configured to accept requests from:

- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `https://new-job-portal-kappa.vercel.app`

## 🐛 Error Responses

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
