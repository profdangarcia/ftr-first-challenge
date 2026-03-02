# Brev.ly - Web Frontend

Web interface for URL shortening management, built with React, TypeScript, and Vite.

## 📋 About the Project

Brev.ly is a complete web application for URL shortening that allows you to:
- Create shortened links (automatic or custom)
- List all registered links
- Copy shortened links to clipboard
- Delete links
- View access count
- Export links to CSV
- Automatic redirect via shortened links

## 🛠 Technologies

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Package Manager**: pnpm

## 📦 Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)
- Brev.ly backend running (see [server README](../server/README.md))

## 🚀 Running Locally

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
VITE_USE_BACKEND=true
```

### 3. Start the Development Server

```bash
pnpm run dev
```

The application will be running at `http://localhost:5173`

### 4. Build for Production

```bash
# Compile the project
pnpm run build

# Preview production build
pnpm run preview
```

Compiled files will be in the `dist/` folder.

## 📁 Project Structure

```
web/
├── public/                 # Static files (favicon, etc)
├── src/
│   ├── assets/            # Images and assets (logos, icons)
│   ├── components/        # React components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Layout components (Header, etc)
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Application pages
│   ├── routes/            # Route configuration
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── index.html
├── package.json
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Style Guide

### Colors

The project uses a custom color system:

- **Blue**: `blue-base` (#2C46B1) and `blue-dark` (#2C4091)
- **Gray**: Scale from `gray-100` to `gray-600`
- **Red**: `danger` (#B12C4D) for errors
- **White**: `white` (#FFFFFF)

### Typography

- **Font**: Open Sans (Google Fonts)
- **Sizes**: `text-xs` (10px) up to `text-xl` (24px)
- **Weights**: `regular` (400), `semibold` (600), `bold` (700)

### UI Components

The project has reusable components:

- **Button**: Buttons with variants (primary, secondary) and sizes (sm, md, lg)
- **IconButton**: Icon-only buttons
- **Input**: Input fields with label, validation, and error messages

## 🔌 API Integration

The application communicates with the backend API through the following endpoints:

- **POST** `/links` - Create new link
- **GET** `/links` - List all links
- **GET** `/links/:shortCode` - Get link by shortened code
- **DELETE** `/links/:id` - Delete link
- **GET** `/links/export` - Export links to CSV

## 📝 Available Scripts

```bash
# Development
pnpm run dev              # Start development server with hot reload

# Build
pnpm run build            # Compile project for production
pnpm run preview          # Preview production build locally

# Linting
pnpm run lint             # Run the linter
```

## 🎯 Features

### Home Page (`/`)

- **New Link Form**: Create shortened links with required original URL and optional custom code
- **Link List**: Displays all registered links with:
  - Shortened URL (clickable)
  - Original URL
  - Access count
  - Copy and delete buttons
  - CSV export button

### Redirect Page (`/:shortCode`)

- Automatically looks up the link by shortened code
- Redirects to the original URL
- Shows "Redirecting..." message during the process
- Displays 404 page when the link is not found

### 404 Page

- Shown when:
  - A shortened link is not found
  - A route does not exist in the application

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_FRONTEND_URL` | Frontend URL (used to generate full links) | No | - |
| `VITE_BACKEND_URL` | Backend API URL | No | `http://localhost:3333` |
| `VITE_USE_BACKEND` | When `true`, uses the backend API; when `false`, stores data in memory and localStorage (no backend) | No | `true` |

## 🏗 Architecture

The project follows a component-based architecture:

- **Pages**: Page components that make up the routes
- **Components**: Reusable components organized by category
- **Services**: Abstraction layer for API calls
- **Utils**: Shared utility functions
- **Types**: Shared TypeScript type definitions

### State Management

- **React Query**: Manages server state (cache, refetch, etc.)
- **React Hook Form**: Manages form state
- **Local State**: `useState` for simple component state

## 📄 License

ISC
