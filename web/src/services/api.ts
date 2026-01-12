import axios from 'axios'
import { requestHandler } from '@/utils/request-handler'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333',
})

export type CreateLinkResponse = {
  id: string
  originalUrl: string
  shortCode: string
  accessCount: number
  createdAt: string
  updatedAt: string
}

export type CreateLinkRequest = {
  originalUrl: string
  shortCode?: string
}

export const linkService = {
  async create(data: CreateLinkRequest) {
    // TODO: Remover delay - apenas para testar loading
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return requestHandler<CreateLinkResponse>(
      () => api.post('/links', data),
      { success: 'Link criado com sucesso!' }
    )
  },
}
