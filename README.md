# Brev.ly - Encurtador de URLs

Monorepo contendo a aplicação completa de encurtamento de URLs **Brev.ly**, composta por backend (API REST) e frontend (aplicação web).

## 📋 Sobre o Projeto

Brev.ly é uma plataforma completa para encurtamento de URLs que permite criar, gerenciar e analisar links encurtados de forma eficiente.

### Funcionalidades Principais

- ✅ Criar links encurtados automaticamente
- ✅ Listar todos os links cadastrados
- ✅ Obter URL original através do código encurtado
- ✅ Deletar links
- ✅ Contabilizar acessos aos links
- ✅ Exportar links para CSV via Cloudflare R2

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

Aplicação web desenvolvida com React.

**Documentação completa**: [web/README.md](./web/README.md)

> **Nota**: O projeto frontend ainda está em desenvolvimento.


## 📚 Documentação

- [Backend - Documentação Completa](./server/README.md)
- [Frontend - Documentação](./web/README.md) (em desenvolvimento)

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
- React
- (Outras tecnologias a serem definidas)

## 📝 Licença

ISC
