# Stage 1: Build
FROM node:22-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Stage 2: Production
FROM node:22-alpine AS production

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Copiar arquivos compilados do stage de build
COPY --from=builder /app/dist ./dist

# Expor porta (padrão 3333, pode ser sobrescrito via env)
EXPOSE 3333

# Variável de ambiente para Node.js
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["node", "dist/infra/http/server.js"]
