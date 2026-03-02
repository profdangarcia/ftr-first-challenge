# Brev.ly - URL Shortener

Monorepo containing the complete **Brev.ly** URL shortening application, composed of a backend (REST API) and frontend (web application).

## 📋 About the Project

Brev.ly is a complete platform for URL shortening that allows you to create, manage, and analyze shortened links efficiently.

### Main Features

**Backend (API):**
- ✅ Create shortened links automatically
- ✅ List all registered links
- ✅ Get original URL via shortened code
- ✅ Delete links
- ✅ Track link access counts
- ✅ Export links to CSV via Cloudflare R2

**Frontend (Web):**
- ✅ Modern, responsive interface
- ✅ Create shortened links (automatic or custom)
- ✅ View full list of links
- ✅ Copy shortened links to clipboard
- ✅ Delete links with confirmation
- ✅ View access count in real time
- ✅ Export links to CSV
- ✅ Automatic redirect via shortened links

## 🌐 Live Demo

Try the app without installing anything — **backendless version** (data stored in the browser's localStorage):

**[→ Brev.ly Live Demo](https://brevly-pink.vercel.app/)**

## 🏗 Project Structure

This is a monorepo containing two main projects:

```
ftr-first-challenge/
├── server/          # Backend API (Fastify + TypeScript + PostgreSQL)
├── web/             # Frontend (React)
└── README.md        # This file
```

## 📦 Projects

### 🔧 Backend (`/server`)

REST API built with Fastify, TypeScript, PostgreSQL, and Drizzle ORM.

**Full documentation**: [server/README.md](./server/README.md)

**Main technologies:**
- Fastify
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod (validation)
- Cloudflare R2 (storage)
- Swagger/OpenAPI (documentation)

### 🎨 Frontend (`/web`)

Modern web application built with React, TypeScript, and Vite, offering an intuitive interface for managing shortened links.

**Full documentation**: [web/README.md](./web/README.md)

**Main technologies:**
- React 18
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- React Hook Form + Zod
- Tailwind CSS
- Axios
- React Toastify


## 📚 Documentation

- [Backend - Full Documentation](./server/README.md)
- [Frontend - Full Documentation](./web/README.md)

## 🛠 Technologies Used

### Backend
- Node.js 22
- Fastify
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod
- Cloudflare R2
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- React Hook Form + Zod
- Tailwind CSS
- Axios
- React Toastify
- Lucide React (icons)

## 🚀 Getting Started

For detailed installation and run instructions, see each project's README:

- [Backend - Installation Guide](./server/README.md)
- [Frontend - Installation Guide](./web/README.md)

## 📝 License

ISC
