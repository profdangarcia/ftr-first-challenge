# Brev.ly - Frontend Web

Interface web para gerenciamento de encurtamento de URLs, desenvolvida com React, TypeScript e Vite.

## 📋 Sobre o Projeto

Brev.ly é uma aplicação web completa para encurtamento de URLs que permite:
- Criar links encurtados (automáticos ou personalizados)
- Listar todos os links cadastrados
- Copiar links encurtados para a área de transferência
- Deletar links
- Visualizar contagem de acessos
- Exportar links para CSV
- Redirecionamento automático através de links encurtados

## 🛠 Tecnologias

- **Framework**: React 18
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Roteamento**: React Router DOM
- **Gerenciamento de Estado**: React Query (TanStack Query)
- **Formulários**: React Hook Form + Zod
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **HTTP Client**: Axios
- **Notificações**: React Toastify
- **Gerenciador de Pacotes**: pnpm

## 📦 Pré-requisitos

- Node.js 18 ou superior
- pnpm (ou npm/yarn)
- Backend Brev.ly rodando (veja [README do servidor](../server/README.md))

## 🚀 Como Executar Localmente

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
pnpm run dev
```

A aplicação estará rodando em `http://localhost:5173`

### 4. Build para Produção

```bash
# Compilar o projeto
pnpm run build

# Visualizar build de produção
pnpm run preview
```

Os arquivos compilados estarão na pasta `dist/`

## 📁 Estrutura do Projeto

```
web/
├── public/                 # Arquivos estáticos (favicon, etc)
├── src/
│   ├── assets/            # Imagens e assets (logos, ícones)
│   ├── components/        # Componentes React
│   │   ├── forms/         # Componentes de formulário
│   │   ├── layout/        # Componentes de layout (Header, etc)
│   │   └── ui/            # Componentes de UI reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── routes/            # Configuração de rotas
│   ├── services/          # Serviços de API
│   ├── types/             # Definições de tipos TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── index.css          # Estilos globais
│   └── main.tsx           # Ponto de entrada da aplicação
├── index.html
├── package.json
├── tailwind.config.js     # Configuração do Tailwind CSS
├── tsconfig.json          # Configuração do TypeScript
└── vite.config.ts         # Configuração do Vite
```

## 🎨 Guia de Estilo

### Cores

O projeto utiliza um sistema de cores customizado:

- **Azul**: `blue-base` (#2C46B1) e `blue-dark` (#2C4091)
- **Cinza**: Escala de `gray-100` a `gray-600`
- **Vermelho**: `danger` (#B12C4D) para erros
- **Branco**: `white` (#FFFFFF)

### Tipografia

- **Fonte**: Open Sans (Google Fonts)
- **Tamanhos**: `text-xs` (10px) até `text-xl` (24px)
- **Pesos**: `regular` (400), `semibold` (600), `bold` (700)

### Componentes UI

O projeto possui componentes reutilizáveis:

- **Button**: Botões com variantes (primary, secondary) e tamanhos (sm, md, lg)
- **IconButton**: Botões apenas com ícone
- **Input**: Campos de entrada com label, validação e mensagens de erro

## 🔌 Integração com a API

A aplicação se comunica com a API backend através dos seguintes endpoints:

- **POST** `/links` - Criar novo link
- **GET** `/links` - Listar todos os links
- **GET** `/links/:shortCode` - Obter link por código encurtado
- **DELETE** `/links/:id` - Deletar link
- **GET** `/links/export` - Exportar links para CSV

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev              # Inicia servidor de desenvolvimento com hot reload

# Build
pnpm run build            # Compila o projeto para produção
pnpm run preview          # Visualiza o build de produção localmente

# Linting
pnpm run lint             # Executa o linter
```

## 🎯 Funcionalidades

### Página Inicial (`/`)

- **Formulário de Novo Link**: Permite criar links encurtados com URL original obrigatória e código personalizado opcional
- **Lista de Links**: Exibe todos os links cadastrados com:
  - URL encurtada (clicável)
  - URL original
  - Contagem de acessos
  - Botões para copiar e deletar
  - Botão para exportar CSV

### Página de Redirecionamento (`/:shortCode`)

- Busca automaticamente o link pelo código encurtado
- Redireciona automaticamente para a URL original
- Exibe mensagem de "Redirecionando..." durante o processo
- Mostra página 404 caso o link não seja encontrado

### Página 404

- Exibida quando:
  - Um link encurtado não é encontrado
  - Uma rota não existe na aplicação

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatório | Padrão |
|----------|-----------|-------------|--------|
| `VITE_FRONTEND_URL` | URL do frontend (usado para gerar links completos) | Não | - |
| `VITE_BACKEND_URL` | URL da API backend | Não | `http://localhost:3333` |

## 🏗 Arquitetura

O projeto segue uma arquitetura baseada em componentes:

- **Pages**: Componentes de página que compõem as rotas
- **Components**: Componentes reutilizáveis organizados por categoria
- **Services**: Camada de abstração para chamadas de API
- **Utils**: Funções utilitárias compartilhadas
- **Types**: Definições de tipos TypeScript compartilhadas

### Gerenciamento de Estado

- **React Query**: Gerencia estado do servidor (cache, refetch, etc)
- **React Hook Form**: Gerencia estado de formulários
- **Estado Local**: `useState` para estado simples de componentes

## 📄 Licença

ISC
