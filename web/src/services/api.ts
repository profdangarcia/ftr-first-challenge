import axios from 'axios'
import { requestHandler } from '@/utils/request-handler'
import type { ILink } from '@/types/link'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333',
})

export type CreateLinkRequest = {
  originalUrl: string
  shortCode?: string
}

export type ListLinksQuery = {
  page?: number
  limit?: number
}

export const linkService = {
  async create(data: CreateLinkRequest) {
    // TODO: Remover delay - apenas para testar loading
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return requestHandler<ILink>(
      () => api.post('/links', data),
      { success: 'Link criado com sucesso!' }
    )
  },

  async list(query?: ListLinksQuery) {
    return api.get<ILink[]>('/links', { params: query })
  },

  async delete(id: string) {
    return requestHandler<void>(
      () => api.delete(`/links/${id}`),
      { success: 'Link excluído com sucesso!' }
    )
  },
}
