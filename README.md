# Full-Stack React SSR Application - Deployment Edition

A modern full-stack application featuring **Server-Side Rendering (SSR)** with React, Vite, Express, and MongoDB. Production-ready with authentication, testing, and containerization.

## Project Overview

This chapter covers deployment strategies and production setup for a complete full-stack React application with server-side rendering capabilities.

### Tech Stack

**Frontend:**

- React 18.2 with SSR
- Vite (build tool with HMR)
- React Router v6
- TanStack React Query
- Tailwind CSS
- Lucide React (icons)

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication (express-jwt)
- bcrypt for password hashing
- Jest for testing

**DevOps:**

- Docker & Docker Compose
- Cross-env for environment management
- Nodemon for development
- Husky & lint-staged for git hooks

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Docker & Docker Compose (optional)

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Development

```bash
# Start frontend dev server (with HMR)
npm run dev

# In another terminal, start backend
cd backend
npm run dev
```

### Production Build

```bash
# Build both client and server bundles
npm run build

# Start production server
npm start
```

## Project Structure

```
ch5_Deployment/
├── src/                    # Frontend (React)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route pages (Blog, Login, Signup)
│   ├── contexts/           # React Context (AuthContext)
│   ├── api/                # API client functions
│   ├── entry-client.jsx    # Client-side hydration entry
│   ├── entry-server.jsx    # Server-side rendering entry
│   └── routes.jsx          # Route definitions
├── backend/                # Node.js server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── index.js        # Server entry point
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── db/             # Database models
│   │   └── middleware/     # Custom middleware (JWT)
│   └── __tests__/          # Jest tests
├── server.js               # SSR middleware for Express
├── compose.yaml            # Docker Compose configuration
└── Dockerfile              # Production Docker image
```

## Key Features

### 🚀 Server-Side Rendering (SSR)

- Initial HTML renders on the server
- Content visible without JavaScript
- Client-side hydration for interactivity
- Improved SEO and perceived performance

### 🔐 Authentication

- JWT-based user authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- AuthContext for client-side state

### 📝 Blogging Platform

- Create, read, update, and delete posts
- Filter and sort capabilities
- User management
- Real-time data caching with React Query

### 🧪 Testing & Quality

- Jest test suite in backend
- ESLint configuration
- Prettier code formatting
- Husky git hooks with lint-staged

### 🐳 Containerization

- Docker support for frontend and backend
- Docker Compose for orchestration
- Environment-based configuration

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build client and server bundles
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start with hot reload (nodemon)
- `npm start` - Start production server
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

## Environment Variables

Create `.env` files in root and backend directories:

**Root `.env`:**

```
VITE_API_URL=http://localhost:3001
```

**Backend `.env`:**

```
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
```

## Docker Deployment

```bash
# Build and start containers
docker-compose up --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Architecture

See [architecture.md](./architecture.md) for detailed SSR workflow diagram and data flow.

## Notes

- See [ch7_notes.md](./ch7_notes.md) for deployment notes and considerations
- Backend API documentation available in [backend/README.md](./backend/README.md)

## License


