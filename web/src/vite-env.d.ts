/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FRONTEND_URL: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_USE_BACKEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
