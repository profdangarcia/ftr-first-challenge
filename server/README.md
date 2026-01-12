# Brev.ly - API de Encurtamento de URLs

API REST para gerenciamento de encurtamento de URLs, desenvolvida com Fastify, TypeScript e PostgreSQL.

## 📋 Sobre o Projeto

Brev.ly é uma API completa para encurtamento de URLs que permite:
- Criar links encurtados automaticamente
- Listar todos os links cadastrados
- Obter a URL original através do código encurtado
- Deletar links
- Contabilizar acessos aos links
- Exportar links para CSV via Cloudflare R2

## 🛠 Tecnologias

- **Runtime**: Node.js 22
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **ORM**: Drizzle ORM
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **Storage**: Cloudflare R2 (S3-compatible)
- **Documentação**: Swagger/OpenAPI
- **Gerenciador de Pacotes**: pnpm

## 📦 Pré-requisitos

- Node.js 22 ou superior
- pnpm (ou npm/yarn)
- PostgreSQL 13 ou superior
- Conta Cloudflare R2 (para upload de CSV)

## 🚀 Como Executar Localmente

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
PORT=3333
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### 3. Executar Migrations

```bash
# Gerar migrations (se necessário)
pnpm run db:generate

# Executar migrations
pnpm run db:migrate
```

### 4. Iniciar o Servidor

```bash
# Desenvolvimento (com hot reload)
pnpm run dev

# Produção
pnpm run build
pnpm start
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Documentação da API

Após iniciar o servidor, a documentação interativa do Swagger estará disponível em:

- **Swagger UI**: http://localhost:3333/docs
- **OpenAPI JSON**: http://localhost:3333/docs/json

## 🐳 Docker

### Construir a Imagem

```bash
docker build -t brevly-api .
```

### Executar com Docker

```bash
docker run -p 3333:3333 --env-file .env brevly-api
```

### Docker Compose

O projeto inclui um `docker-compose.yml` para facilitar o desenvolvimento com PostgreSQL:

```bash
docker-compose up -d
```

## 📁 Estrutura do Projeto

```
server/
├── src/
│   ├── app/
│   │   └── functions/          # Lógica de negócio (use cases)
│   │       ├── create-link.ts
│   │       ├── delete-link.ts
│   │       ├── get-link-by-short-code.ts
│   │       ├── list-links.ts
│   │       ├── export-links-to-csv.ts
│   │       └── errors/         # Classes de erro customizadas
│   ├── infra/
│   │   ├── db/
│   │   │   ├── schemas/        # Schemas do Drizzle ORM
│   │   │   ├── migrations/     # Migrations do banco
│   │   │   ├── index.ts        # Conexão com o banco
│   │   │   └── migrate.ts      # Script de migração
│   │   ├── http/
│   │   │   ├── routes/         # Rotas da API
│   │   │   └── server.ts       # Configuração do servidor
│   │   ├── storage/            # Integração com Cloudflare R2
│   │   └── shared/             # Utilitários compartilhados
│   └── env.ts                  # Validação de variáveis de ambiente
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
└── package.json
```

## 🔌 Endpoints da API

### Health Check
- **GET** `/health` - Verifica se a API está funcionando

### Links
- **POST** `/links` - Cria um novo link encurtado
- **GET** `/links` - Lista todos os links (com paginação)
- **GET** `/links/:shortCode` - Obtém a URL original pelo código encurtado (incrementa contador)
- **DELETE** `/links/:id` - Deleta um link por ID
- **GET** `/links/export` - Exporta todos os links para CSV no Cloudflare R2

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev              # Inicia servidor com hot reload

# Banco de Dados
pnpm run db:generate      # Gera migrations do Drizzle
pnpm run db:migrate       # Executa migrations
pnpm run db:studio        # Abre Drizzle Studio (interface visual do banco)

# Build
pnpm run build            # Compila TypeScript para JavaScript
pnpm start                # Executa versão compilada

# Testes
pnpm test                 # Executa testes
pnpm run test:watch       # Executa testes em modo watch
```

## 🗄 Banco de Dados

O projeto usa Drizzle ORM para gerenciar o banco de dados. A tabela principal é:

### Tabela `links`
- `id` (UUID) - Identificador único
- `original_url` (TEXT) - URL original
- `short_code` (TEXT) - Código encurtado (único)
- `access_count` (INTEGER) - Contador de acessos
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `PORT` | Porta do servidor (padrão: 3333) | Não |
| `DATABASE_URL` | URL de conexão com PostgreSQL | Sim |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare | Sim |
| `CLOUDFLARE_ACCESS_KEY_ID` | Access Key ID do R2 | Sim |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Secret Access Key do R2 | Sim |
| `CLOUDFLARE_BUCKET` | Nome do bucket R2 | Sim |
| `CLOUDFLARE_PUBLIC_URL` | URL pública do bucket | Sim |

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas:

- **Infrastructure Layer** (`src/infra/`): Configurações e integrações externas (HTTP, DB, Storage)
- **Application Layer** (`src/app/functions/`): Lógica de negócio e use cases
- **Domain Layer**: Representado pelas classes de erro e tipos compartilhados

As rotas utilizam validação Zod e retornam erros tipados usando o padrão Either.

## 📄 Licença

ISC
