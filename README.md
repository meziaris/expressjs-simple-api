# ExpressJS Simple API

Simple REST API built with ExpressJS, TypeScript, and Prisma ORM.

## 🚀 Quick Links

### Live Demo

🔗 **API URL**: [https://expressjs-simple-api.up.railway.app](https://expressjs-simple-api.up.railway.app)

### Postman Collection

📚 **Documentation**: [View Postman Collection](https://www.postman.com/apronny/workspace/public/collection/18814316-cedd3cca-a708-4e36-b0b4-897bc9d47eab?action=share&source=copy-link&creator=18814316)

## Tech Stack

- **Node.js** (v22)
- **TypeScript** (v5.9)
- **Express.js** (v5.1)
- **Prisma ORM** (v6.14)
- **PostgreSQL**
- **Zod** (Schema validation)
- **Bcrypt** (Password hashing)

## Prerequisites

- Node.js v22 or higher
- pnpm package manager
- PostgreSQL database (for local development)
- Docker & Docker Compose (for Docker deployment)

## Project Structure

```
expressjs-simple-api/
├── src/                    # Source code directory
│   ├── application/        # Application setup
│   │   ├── app.ts         # Express app configuration
│   │   └── database.ts    # Prisma client instance
│   ├── config/            # Configuration management
│   │   └── config.ts      # Environment variables config
│   ├── controller/        # HTTP request handlers
│   │   ├── department.controller.ts
│   │   └── user.controller.ts
│   ├── error/             # Error handling utilities
│   │   └── response.error.ts
│   ├── middleware/        # Express middleware
│   │   └── error.middleware.ts
│   ├── route/             # API routes definition
│   │   └── v1/           # Version 1 API routes
│   │       ├── index.ts
│   │       ├── departments.ts
│   │       └── users.ts
│   ├── schema/            # TypeScript types & response schemas
│   │   ├── department.schema.ts
│   │   └── user.schema.ts
│   ├── service/           # Business logic layer
│   │   ├── department.service.ts
│   │   └── user.service.ts
│   ├── validation/        # Request validation schemas
│   │   ├── department.validation.ts
│   │   ├── user.validation.ts
│   │   └── validation.ts
│   └── main.ts            # Application entry point
├── prisma/                # Database ORM
│   ├── migrations/        # Database migration files
│   └── schema.prisma      # Database schema definition
├── dist/                  # Compiled JavaScript (generated)
├── docker-compose.yaml    # Docker services configuration
├── Dockerfile            # Container build instructions
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.ts      # ESLint configuration
└── README.md             # Project documentation
```

## Installation & Running

### Option 1: Run Locally

1. **Clone the repository**

```bash
git clone <repository-url>
cd expressjs-simple-api
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
# Edit .env file with your database credentials
```

4. **Setup database**

```bash
# Run PostgreSQL locally or use a cloud instance
# Update DATABASE_URL in .env file

# Run migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate
```

5. **Run the application**

```bash
# Development mode (with hot reload)
pnpm dev

# Production mode
pnpm build
pnpm start
```

The API will be available at `http://localhost:3333`

### Option 2: Run with Docker

1. **Clone the repository**

```bash
git clone <repository-url>
cd expressjs-simple-api
```

2. **Setup environment variables**

```bash
cp .env.example .env
# Edit .env file if needed
```

3. **Build and run with Docker Compose**

```bash
# Start all services (PostgreSQL + App)
docker-compose up -d

# View logs
docker-compose logs -f expressjs-simple-api-app

# Stop all services
docker-compose down

# Stop and remove volumes (clean database)
docker-compose down -v
```

The API will be available at `http://localhost:3333`

## API Endpoints

### Users

- `POST /users` - Register new user

### Departments

- `POST /departments` - Create new department

## Available Scripts

- `pnpm dev` - Run in development mode with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Run production build
- `pnpm typecheck` - Check TypeScript types
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors

## Environment Variables

Copy `.env.example` to `.env` and adjust values as needed:

```env
# Server Configuration
PORT=3333

# Database Configuration
# For local development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expressjs_api?schema=public"

# For Docker deployment (used by docker-compose.yaml)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=expressjs_api
```

## Database Schema

The application uses Prisma ORM with PostgreSQL. Main entities:

- **User** - Application users with authentication
- **Department** - Organizational departments
- **Address** - User addresses
