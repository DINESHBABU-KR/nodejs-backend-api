# Node.js Backend API

A production-oriented REST API built with Node.js, Express.js and MongoDB, featuring JWT authentication, role-based access control, Redis caching, BullMQ background jobs and Docker containerization.

## Features

- User registration and login with JWT authentication
- Password hashing using bcryptjs
- Protected routes using authentication middleware
- Role-based access control (RBAC)
- User management CRUD APIs
- Request validation using express-validator
- MongoDB integration with Mongoose
- Redis caching for user-list endpoints
- Cache invalidation after data updates
- Background job processing using BullMQ
- API security using Helmet and CORS
- Automated API testing using Jest and Supertest
- Isolated test database using MongoDB Memory Server
- Docker and Docker Compose support

## Tech Stack

| Category | Technologies |
|---|---|
| Runtime | Node.js |
| Backend | Express.js |
| Language | JavaScript (ES Modules) |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Authorization | RBAC |
| Validation | express-validator |
| Caching | Redis, ioredis |
| Background Jobs | BullMQ |
| Testing | Jest, Supertest |
| Infrastructure | Docker, Docker Compose |
| Security | Helmet, CORS |

## Project Structure

```text
nodejs-backend-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── queue.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── workers/
│   │   └── notificationWorker.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── setup.js
│   ├── envSetup.js
│   ├── health.test.js
│   ├── auth.test.js
│   └── authMiddleware.test.js
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Redis
- Docker (optional)

### 1. Clone the repository

```bash
git clone https://github.com/DINESHBABU-KR/nodejs-backend-api.git

cd nodejs-backend-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/nodejs_backend

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

Never commit your actual `.env` file or production secrets.

### 4. Start the API

```bash
npm run dev
```

### 5. Start the background worker

In another terminal:

```bash
npm run worker
```

API base URL:

`http://localhost:5000/api/v1`

## API Documentation

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API status |

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a user | Public |
| POST | `/auth/login` | Login user | Public |

### User

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/users/profile` | Get current user profile | Authenticated |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/users` | Get all users | Admin |
| POST | `/admin/users` | Create a user | Admin |
| GET | `/admin/users/:id` | Get user by ID | Admin |
| PUT | `/admin/users/:id` | Update user | Admin |
| DELETE | `/admin/users/:id` | Delete user | Admin |

All endpoints above are relative to `/api/v1`.

For protected endpoints, include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Authentication Flow

1. User registers with name, email and password.
2. Password is hashed using bcryptjs.
3. User logs in with credentials.
4. Server generates a JWT.
5. Client sends the JWT in the Authorization header.
6. Authentication middleware verifies the token and loads the user.
7. RBAC middleware checks the user's role for restricted endpoints.

## Redis Caching

Redis is used to cache user-list API responses.

- Cache responses for faster repeated requests.
- Use pagination-specific cache keys.
- Invalidate cached data after create, update and delete operations.
- Fall back to the database when cache reads fail, where implemented.

## Background Jobs

BullMQ handles asynchronous notification jobs.

Current demonstration: a welcome-notification job is processed by a worker.

The worker currently demonstrates job processing through logs; it is not a real email delivery integration.

## Running Tests

Run all automated tests:

```bash
npm test
```

Run tests with open-handle detection:

```bash
npm run test -- --detectOpenHandles
```

Test coverage includes:

- Health endpoint
- User registration
- Duplicate email validation
- Login success and failure
- JWT authentication
- Protected routes
- Role-based access control

## Docker Setup

Build Docker images:

```bash
docker compose build
```

Start all services:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f api
docker compose logs -f worker
```

Stop containers:

```bash
docker compose down
```

## Future Improvements

- API documentation with Swagger / OpenAPI
- Integration testing for all CRUD endpoints
- Rate limiting
- Structured logging
- CI/CD pipeline with GitHub Actions
- Production deployment
- Monitoring and health checks

## Author

**Dinesh Babu KR**

Full Stack Developer | Node.js | React.js | Backend Engineering

- GitHub: https://github.com/DINESHBABU-KR
- LinkedIn: https://www.linkedin.com/in/dineshbabu-blockchaindev
