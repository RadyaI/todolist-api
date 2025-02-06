# API Documentation

## Setup

1. Clone repository:
   ```sh
   git clone https://github.com/RadyaI/todolist-api.git
   cd todolist-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup Prisma:
   ```sh
   npx prisma migrate dev
   ```
4. Run the server:
   ```sh
   npm run dev
   ```

---

## Base URL
```
localhost:3000/api/v1 atau example.com/api/v1
```

## Authentication Endpoints

### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "name": "Fulan",
    "email": "fulan@example.com",
    "password": "fulanganteng"
  }
  ```

### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "fulan@example.com",
    "password": "fulanganteng"
  }
  ```

---

## User Endpoints

### Get Current User
- **GET** `/user/`
- **Headers:** `{ Authorization: Bearer <token> }`

### Get All Users (Admin Only)
- **GET** `/user/all`
- **Headers:** `{ Authorization: Bearer <token> }`

### Get User by ID (Admin Only)
- **GET** `/user/all/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

### Update User
- **PUT** `/user/`
- **Headers:** `{ Authorization: Bearer <token> }`

### Delete User
- **DELETE** `/user/`
- **Headers:** `{ Authorization: Bearer <token> }`

---

## Task Endpoints

### Get All Tasks
- **GET** `/task/`
- **Headers:** `{ Authorization: Bearer <token> }`

### Get Active Tasks
- **GET** `/task/active`
- **Headers:** `{ Authorization: Bearer <token> }`

### Get Task by ID
- **GET** `/task/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

### Create Task
- **POST** `/task/`
- **Headers:** `{ Authorization: Bearer <token> }`
- **Body:**
  ```json
  {
    "taskName": "Complete project",
    "priority": "Low/Medium/High"
  }
  ```

### Mark Task as Done
- **PUT** `/task/done/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

### Update Task
- **PUT** `/task/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

### Delete Task
- **DELETE** `/task/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

---

## Example Fetch Request
```js
fetch('/api/v1/task/', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your_jwt_token'
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Made by [Radya](https://radya.fun)