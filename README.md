# Brev.ly - Encurtador de URLs

Monorepo contendo a aplicação completa de encurtamento de URLs **Brev.ly**, composta por backend (API REST) e frontend (aplicação web).

## 📋 Sobre o Projeto

Brev.ly é uma plataforma completa para encurtamento de URLs que permite criar, gerenciar e analisar links encurtados de forma eficiente.

### Funcionalidades Principais

**Backend (API):**
- ✅ Criar links encurtados automaticamente
- ✅ Listar todos os links cadastrados
- ✅ Obter URL original através do código encurtado
- ✅ Deletar links
- ✅ Contabilizar acessos aos links
- ✅ Exportar links para CSV via Cloudflare R2

**Frontend (Web):**
- ✅ Interface moderna e responsiva
- ✅ Criar links encurtados (automáticos ou personalizados)
- ✅ Visualizar lista completa de links
- ✅ Copiar links encurtados para área de transferência
- ✅ Deletar links com confirmação
- ✅ Visualizar contagem de acessos em tempo real
- ✅ Exportar links para CSV
- ✅ Redirecionamento automático através de links encurtados

## 🏗 Estrutura do Projeto

Este é um monorepo contendo dois projetos principais:

```
ftr-first-challenge/
├── server/          # Backend API (Fastify + TypeScript + PostgreSQL)
├── web/             # Frontend (React)
└── README.md        # Este arquivo
```

## 📦 Projetos

### 🔧 Backend (`/server`)

API REST desenvolvida com Fastify, TypeScript, PostgreSQL e Drizzle ORM.

**Documentação completa**: [server/README.md](./server/README.md)

**Principais tecnologias:**
- Fastify
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod (validação)
- Cloudflare R2 (storage)
- Swagger/OpenAPI (documentação)

### 🎨 Frontend (`/web`)

Aplicação web moderna desenvolvida com React, TypeScript e Vite, oferecendo uma interface intuitiva para gerenciamento de links encurtados.

**Documentação completa**: [web/README.md](./web/README.md)

**Principais tecnologias:**
- React 18
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- React Hook Form + Zod
- Tailwind CSS
- Axios
- React Toastify


## 📚 Documentação

- [Backend - Documentação Completa](./server/README.md)
- [Frontend - Documentação Completa](./web/README.md)

## 🛠 Tecnologias Utilizadas

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
- Lucide React (ícones)

## 🚀 Como Começar

Para instruções detalhadas de instalação e execução, consulte os READMEs específicos de cada projeto:

- [Backend - Guia de Instalação](./server/README.md)
- [Frontend - Guia de Instalação](./web/README.md)

## 📝 Licença

ISC
