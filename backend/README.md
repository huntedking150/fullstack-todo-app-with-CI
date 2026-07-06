# Blog Backend API

A Node.js/Express backend for a full-stack blog application with MongoDB integration, JWT authentication, and comprehensive testing setup.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker](#docker)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## Overview

This is the backend API for a full-stack blog application built with:

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - Authentication
- **Jest** - Testing framework

The backend handles:

- User authentication (signup/login)
- Post CRUD operations (Create, Read, Update, Delete)
- JWT token validation
- Database operations
- API routes and middleware

---

## Tech Stack

| Technology         | Version | Purpose                 |
| ------------------ | ------- | ----------------------- |
| Node.js            | 20      | JavaScript runtime      |
| Express.js         | ^4.18.2 | Web framework           |
| MongoDB            | 8.3.3+  | NoSQL database          |
| Mongoose           | Latest  | MongoDB ODM             |
| JWT (jsonwebtoken) | Latest  | Authentication tokens   |
| Jest               | Latest  | Testing framework       |
| ESLint             | ^8.57.1 | Code linting            |
| Prettier           | ^3.8.4  | Code formatting         |
| Nodemon            | Latest  | Development auto-reload |

---

## Project Structure

```
backend/
├── src/
│   ├── app.js                    # Express app setup
│   ├── index.js                  # Server entry point
│   ├── db/
│   │   ├── init.js              # Database initialization
│   │   └── models/
│   │       ├── user.js          # User schema
│   │       └── post.js          # Post schema
│   ├── middleware/
│   │   └── jwt.js               # JWT authentication middleware
│   ├── routes/
│   │   ├── users.js             # User routes (/users)
│   │   └── posts.js             # Post routes (/posts)
│   ├── services/
│   │   ├── users.js             # User business logic
│   │   └── posts.js             # Post business logic
│   └── __tests__/
│       └── posts.test.js        # Post API tests
├── src/test/
│   ├── globalSetup.js           # Jest global setup (MongoDB setup)
│   ├── globalTeardown.js        # Jest global teardown (MongoDB cleanup)
│   └── setupFileAfterEnv.js     # Jest test lifecycle
├── jest.config.json             # Jest configuration
├── nodemon.json                 # Nodemon configuration
├── .env                         # Environment variables (local dev)
├── package.json                 # Dependencies
├── Dockerfile                   # Docker configuration
├── .dockerignore                # Docker ignore file
└── README.md                    # This file
```

---

## Installation

### Prerequisites

- Node.js 20+ installed
- MongoDB 8.3.3+ (for development or Docker)
- npm or yarn

### Steps

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   cp .env.example .env  # Or create .env manually
   ```

4. **Update .env with your database URL** (see Configuration section)

---

## Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3002                                          # Server port

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/blog       # MongoDB connection string

# JWT Configuration
JWT_SECRET=YOUR_JWT_SECRET_KEY  # Secret key for signing tokens
```

### Database Configuration by Environment

**Development (Local MongoDB):**

```env
DATABASE_URL=mongodb://localhost:27017/blog
```

**Docker Compose:**

```env
DATABASE_URL=mongodb://host.docker.internal:27018/blog
```

**Testing (MongoMemoryServer - Automatic):**

- Automatically set by `globalSetup.js`
- No need to configure manually

**Production (MongoDB Atlas):**

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/blog
```

---

## Database Setup

### Architecture

The database setup follows a three-tier approach:

```
┌─────────────────────────────────────────┐
│         initDatabase()                   │
│    (src/db/init.js)                      │
└──────────────┬──────────────────────────┘
               │ mongoose.connect(DATABASE_URL)
     ┌─────────┼─────────┐
     │         │         │
   Dev        Docker     Test
     │         │         │
  Local     Container   In-Memory
 MongoDB    MongoDB     MongoDB
```

### Mongoose Connection

**File: `src/db/init.js`**

```javascript
export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.log(`successfully connected to database: ${DATABASE_URL}`)
  })

  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
```

### Database Models

#### **User Model** (`src/db/models/user.js`)

```javascript
// Fields:
// - email: String (required, unique)
// - password: String (required)
// - createdAt: Date (auto)
// - updatedAt: Date (auto)
```

#### **Post Model** (`src/db/models/post.js`)

```javascript
// Fields:
// - title: String (required)
// - body: String (required)
// - author: ObjectId reference to User
// - createdAt: Date (auto)
// - updatedAt: Date (auto)
```

---

## Running the Server

### Development Mode

Start the server with automatic restart on file changes:

```bash
npm run dev
```

Expected output:

```
express server running on http://localhost:3002
successfully connected to database: mongodb://localhost:27017/blog
```

**Requirements:**

- MongoDB must be running on localhost:27017
- You can start MongoDB with: `mongod` (macOS/Linux) or `mongod.exe` (Windows)

### Production Mode

Build and start the server optimized for production:

```bash
npm start
```

**Requires:**

- `.env` file with production values
- MongoDB accessible at configured DATABASE_URL
- Node.js 20+

### Nodemon Configuration

**File: `nodemon.json`**

Automatically restarts server when these file types change:

- `.js` files in `src/` directory
- Ignores `node_modules/` and test files

```bash
npm run dev  # Uses nodemon
```

---

## API Endpoints

### Base URL

```
http://localhost:3002/api/v1
```

### User Routes (`/api/v1/users`)

#### Signup

```
POST /api/v1/users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "user@example.com"
}
```

#### Login

```
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "user@example.com"
}
```

### Post Routes (`/api/v1/posts`)

#### Get All Posts

```
GET /api/v1/posts?author=userId&sortBy=createdAt&sortOrder=descending

Query Parameters:
- author: Filter by author ID (optional)
- sortBy: Field to sort by (createdAt, updatedAt) (optional)
- sortOrder: Sort order (ascending, descending) (optional)

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Post",
    "body": "Post content...",
    "author": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Create Post

```
POST /api/v1/posts
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "My Blog Post",
  "body": "This is my blog post content"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Blog Post",
  "body": "This is my blog post content",
  "author": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update Post

```
PATCH /api/v1/posts/:postId
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content"
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "body": "Updated content",
  "author": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### Delete Post

```
DELETE /api/v1/posts/:postId
Authorization: Bearer <JWT_TOKEN>

Response (204): No Content
```

---

## Testing

### Overview

Testing setup uses:

- **Jest** - Test framework
- **MongoMemoryServer** - In-memory MongoDB for tests
- **Automatic setup/teardown** - Clean database state between tests

### MongoDB Memory Server

**What it is:**

- In-memory MongoDB instance running in RAM
- Super fast compared to disk-based MongoDB
- No installation required
- Automatic cleanup after tests

**How it works:**

1. **Before tests** (`globalSetup.js`):
   - Downloads MongoDB v8.3.3 binary
   - Starts in-memory server
   - Sets `DATABASE_URL` to point to in-memory instance

2. **During tests** (`setupFileAfterEnv.js`):
   - Connects to in-memory MongoDB
   - Runs all tests
   - Each test gets fresh database state

3. **After tests** (`globalTeardown.js`):
   - Stops in-memory server
   - Cleans up all test data
   - Frees RAM

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test posts.test.js

# Run tests with coverage
npm test -- --coverage
```

### Test Files

**File: `src/__tests__/posts.test.js`**

Example test structure:

```javascript
describe('POST /posts', () => {
  test('should create a new post', async () => {
    // Test code
  })
})

describe('GET /posts', () => {
  test('should fetch all posts', async () => {
    // Test code
  })
})
```

### Jest Configuration

**File: `jest.config.json`**

```json
{
  "testEnvironment": "node",
  "globalSetup": "<rootDir>/src/test/globalSetup.js",
  "globalTeardown": "<rootDir>/src/test/globalTeardown.js",
  "setupFilesAfterEnv": ["<rootDir>/src/test/setupFileAfterEnv.js"]
}
```

### Benefits of MongoMemoryServer

| Benefit            | Value                                       |
| ------------------ | ------------------------------------------- |
| **Speed**          | 100x faster than disk-based tests           |
| **Isolation**      | Each test run is isolated                   |
| **Clean State**    | Automatic cleanup between tests             |
| **CI/CD Friendly** | No MongoDB installation needed              |
| **Parallel**       | Can run multiple test suites simultaneously |
| **Consistency**    | Always uses same MongoDB version (8.3.3)    |

---

## Docker

### Docker Setup

Your application is containerized with Docker for easy deployment and environment consistency.

### Docker Compose

**File: `compose.yaml`**

Three services:

1. **blog-database** - MongoDB

   ```
   Image: mongo
   Port: 27018 (external) → 27017 (internal)
   ```

2. **blog-backend** - Express API

   ```
   Build: From backend/Dockerfile
   Port: 3002
   DATABASE_URL: mongodb://host.docker.internal:27018/blog
   ```

3. **blog-frontend** - React SSR
   ```
   Build: From root Dockerfile
   Port: 3000
   ```

### Running with Docker Compose

**Start all services:**

```bash
docker-compose up
```

**Start in background:**

```bash
docker-compose up -d
```

**Stop all services:**

```bash
docker-compose down
```

**Stop and remove volumes (delete data):**

```bash
docker-compose down -v
```

### Building Backend Image

```bash
# Build image
docker build -t blog-backend backend/

# Run container
docker run -p 3002:3002 \
  -e DATABASE_URL=mongodb://localhost:27017/blog \
  -e PORT=3002 \
  blog-backend
```

### Dockerfile

**File: `Dockerfile`**

```dockerfile
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
```

**Stages:**

1. Use Node 20 image
2. Set working directory
3. Copy package files
4. Install dependencies
5. Copy application code
6. Start server with `npm start`

---

## Development

### Scripts

Available npm scripts:

```bash
# Development with auto-reload
npm run dev

# Production start
npm start

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Code Structure

**Separation of Concerns:**

```
Routes (routes/)
   ↓
Services (services/)
   ↓
Models (db/models/)
   ↓
MongoDB
```

- **Routes** - HTTP endpoints and validation
- **Services** - Business logic
- **Models** - Data schema and database operations

### Middleware

**JWT Authentication Middleware** (`src/middleware/jwt.js`)

Protects routes that require authentication:

```javascript
router.post('/posts', authenticateJWT, createPost)
```

Validates JWT token from `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning      | Example                   |
| ---- | ------------ | ------------------------- |
| 200  | OK           | POST/GET successful       |
| 201  | Created      | POST created new resource |
| 204  | No Content   | DELETE successful         |
| 400  | Bad Request  | Invalid input data        |
| 401  | Unauthorized | Missing/invalid JWT token |
| 404  | Not Found    | Resource doesn't exist    |
| 500  | Server Error | Unexpected error          |

### Error Response Format

```json
{
  "error": "Error message",
  "status": 400
}
```

---

## Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongooseError: Cannot connect to MongoDB`

**Solutions:**

1. Check if MongoDB is running
2. Verify DATABASE_URL in .env
3. Ensure MongoDB is accessible on the specified port

```bash
# Check MongoDB status (macOS)
brew services list

# Start MongoDB (macOS)
brew services start mongodb-community

# Check MongoDB status (Linux)
sudo systemctl status mongod

# Start MongoDB (Linux)
sudo systemctl start mongod
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3002`

**Solutions:**

```bash
# Find process using port
lsof -i :3002

# Kill process (macOS/Linux)
kill -9 <PID>

# Or change PORT in .env
PORT=3001
```

### Tests Failing

**Problem:** Tests hang or timeout

**Solutions:**

1. Check if MongoDB is running (not needed for tests with MongoMemoryServer)
2. Clear node_modules and reinstall
3. Check NODE_ENV is not set to production

```bash
rm -rf node_modules package-lock.json
npm install
npm test
```

### Docker Connection Issues

**Problem:** Backend can't connect to MongoDB container

**Solutions:**

1. Use `host.docker.internal:27018` (not localhost)
2. Ensure both services are in docker-compose.yml
3. Check `depends_on` configuration

```yaml
# Correct in compose.yaml
blog-backend:
  environment:
    - DATABASE_URL=mongodb://host.docker.internal:27018/blog
  depends_on:
    - blog-database
```

---

## Performance Optimization

### Connection Pooling

Configure MongoDB connection pool in `src/db/init.js`:

```javascript
mongoose.connect(DATABASE_URL, {
  maxPoolSize: 10,
  minPoolSize: 2,
})
```

### Indexes

Create database indexes for common queries:

```javascript
// In models
schema.index({ author: 1, createdAt: -1 })
schema.index({ email: 1 }, { unique: true })
```

---

## Security Best Practices

1. **Never commit `.env`** - Use `.env.example` template
2. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Validate all inputs** - Sanitize and validate request data
4. **Use HTTPS in production** - Use SSL/TLS certificates
5. **Keep dependencies updated** - Run `npm audit fix`
6. **Set secure headers** - Use helmet middleware

---

## Contributing

1. Follow ESLint rules
2. Format code with Prettier
3. Write tests for new features
4. Update documentation

---

## License


