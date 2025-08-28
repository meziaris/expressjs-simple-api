# ExpressJS Simple API

Simple REST API built with ExpressJS, TypeScript, and Prisma ORM.

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
├── src/
│   ├── application/    # App configuration & database
│   ├── config/         # Environment configuration
│   ├── controller/     # Request handlers
│   ├── error/          # Error handling
│   ├── middleware/     # Express middlewares
│   ├── schema/         # TypeScript types & schemas
│   ├── service/        # Business logic
│   ├── validation/     # Request validation
│   └── main.ts         # Application entry point
├── prisma/
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Database schema
└── docker-compose.yaml # Docker configuration
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
docker-compose logs -f app

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

## Development Notes

- Uses ESM modules (type: "module")
- TypeScript strict mode enabled
- Prisma client auto-generated in `src/generated/`
- Password hashing with bcrypt (10 rounds)
- Request validation with Zod schemas

## Testing the API

### Create Department

```bash
curl -X POST http://localhost:3333/departments \
  -H "Content-Type: application/json" \
  -d '{"name": "Engineering"}'
```

### Register User

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0812345678901",
    "password": "password123",
    "status": "ACTIVE",
    "departmentId": "<department-uuid>"
  }'
```
