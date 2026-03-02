# Brev.ly - URL Shortening API

REST API for URL shortening management, built with Fastify, TypeScript, and PostgreSQL.

## 📋 About the Project

Brev.ly is a complete API for URL shortening that allows you to:
- Create shortened links automatically
- List all registered links
- Get the original URL via the shortened code
- Delete links
- Track link access counts
- Export links to CSV via Cloudflare R2

## 🛠 Technologies

- **Runtime**: Node.js 22
- **Framework**: Fastify
- **Language**: TypeScript
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Validation**: Zod
- **Storage**: Cloudflare R2 (S3-compatible)
- **Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm

## 📦 Prerequisites

- Node.js 22 or higher
- pnpm (or npm/yarn)
- PostgreSQL 13 or higher
- Cloudflare R2 account (for CSV upload)

## 🚀 Running Locally

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
PORT=3333
DATABASE_URL=postgresql://user:password@localhost:5432/database_name

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### 3. Run Migrations

```bash
# Generate migrations (if needed)
pnpm run db:generate

# Run migrations
pnpm run db:migrate
```

### 4. Start the Server

```bash
# Development (with hot reload)
pnpm run dev

# Production
pnpm run build
pnpm start
```

The server will be running at `http://localhost:3333`

## 📚 API Documentation

After starting the server, the interactive Swagger documentation is available at:

- **Swagger UI**: http://localhost:3333/docs
- **OpenAPI JSON**: http://localhost:3333/docs/json

## 🐳 Docker

### Build the Image

```bash
docker build -t brevly-api .
```

### Run with Docker

```bash
docker run -p 3333:3333 --env-file .env brevly-api
```

### Docker Compose

The project includes a `docker-compose.yml` for easier development with PostgreSQL:

```bash
docker-compose up -d
```

## 📁 Project Structure

```
server/
├── src/
│   ├── app/
│   │   └── functions/          # Business logic (use cases)
│   │       ├── create-link.ts
│   │       ├── delete-link.ts
│   │       ├── get-link-by-short-code.ts
│   │       ├── list-links.ts
│   │       ├── export-links-to-csv.ts
│   │       └── errors/         # Custom error classes
│   ├── infra/
│   │   ├── db/
│   │   │   ├── schemas/        # Drizzle ORM schemas
│   │   │   ├── migrations/     # Database migrations
│   │   │   ├── index.ts        # Database connection
│   │   │   └── migrate.ts      # Migration script
│   │   ├── http/
│   │   │   ├── routes/         # API routes
│   │   │   └── server.ts       # Server configuration
│   │   ├── storage/            # Cloudflare R2 integration
│   │   └── shared/             # Shared utilities
│   └── env.ts                  # Environment variable validation
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
└── package.json
```

## 🔌 API Endpoints

### Health Check
- **GET** `/health` - Check if the API is running

### Links
- **POST** `/links` - Create a new shortened link
- **GET** `/links` - List all links (with pagination)
- **GET** `/links/:shortCode` - Get original URL by shortened code (increments counter)
- **DELETE** `/links/:id` - Delete a link by ID
- **GET** `/links/export` - Export all links to CSV on Cloudflare R2

## 📝 Available Scripts

```bash
# Development
pnpm run dev              # Start server with hot reload

# Database
pnpm run db:generate      # Generate Drizzle migrations
pnpm run db:migrate       # Run migrations
pnpm run db:studio        # Open Drizzle Studio (visual database interface)

# Build
pnpm run build            # Compile TypeScript to JavaScript
pnpm start                # Run compiled version

# Tests
pnpm test                 # Run tests
pnpm run test:watch       # Run tests in watch mode
```

## 🗄 Database

The project uses Drizzle ORM to manage the database. The main table is:

### `links` table
- `id` (UUID) - Unique identifier
- `original_url` (TEXT) - Original URL
- `short_code` (TEXT) - Shortened code (unique)
- `access_count` (INTEGER) - Access counter
- `created_at` (TIMESTAMP) - Creation date
- `updated_at` (TIMESTAMP) - Last update date

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3333) | No |
| `DATABASE_URL` | PostgreSQL connection URL | Yes |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Yes |
| `CLOUDFLARE_ACCESS_KEY_ID` | R2 Access Key ID | Yes |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | R2 Secret Access Key | Yes |
| `CLOUDFLARE_BUCKET` | R2 bucket name | Yes |
| `CLOUDFLARE_PUBLIC_URL` | Public bucket URL | Yes |

## 🏗 Architecture

The project follows a layered architecture:

- **Infrastructure Layer** (`src/infra/`): External configurations and integrations (HTTP, DB, Storage)
- **Application Layer** (`src/app/functions/`): Business logic and use cases
- **Domain Layer**: Represented by error classes and shared types

Routes use Zod validation and return typed errors using the Either pattern.

## 📄 License

ISC
