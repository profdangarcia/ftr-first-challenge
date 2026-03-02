import axios from 'axios'
import { requestHandler } from '@/utils/request-handler'
import { toast } from 'react-toastify'
import type { ILink } from '@/types/link'
import { linkStorage } from '@/services/storage'
import { exportToCsv } from '@/utils/csv-export'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333',
})

/** true = usa backend; false = dados em memória + localStorage */
export const useBackend = (): boolean =>
  import.meta.env.VITE_USE_BACKEND === 'true'

export type CreateLinkRequest = {
  originalUrl: string
  shortCode?: string
}

export type ListLinksQuery = {
  page?: number
  limit?: number
}

async function createWithBackend(data: CreateLinkRequest) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return requestHandler<ILink>(
    () => api.post('/links', data),
    { success: 'Link criado com sucesso!' }
  )
}

async function createWithStorage(data: CreateLinkRequest) {
  try {
    const link = linkStorage.create(data)
    toast.success('Link criado com sucesso!')
    return { data: link, errors: false as const }
  } catch {
    toast.error('Erro ao criar link. Tente novamente.')
    return { data: null, errors: true as const }
  }
}

async function listWithBackend(query?: ListLinksQuery) {
  return api.get<ILink[]>('/links', { params: query })
}

async function listWithStorage() {
  return { data: linkStorage.getAll() }
}

async function deleteWithBackend(id: string) {
  return requestHandler<void>(
    () => api.delete(`/links/${id}`),
    { success: 'Link excluído com sucesso!' }
  )
}

async function deleteWithStorage(id: string) {
  const ok = linkStorage.delete(id)
  if (ok) {
    toast.success('Link excluído com sucesso!')
    return { data: null, errors: false as const }
  }
  toast.error('Link não encontrado.')
  return { data: null, errors: true as const }
}

async function getByShortCodeWithBackend(shortCode: string) {
  return api.get<ILink>(`/links/${shortCode}`)
}

async function getByShortCodeWithStorage(shortCode: string) {
  const link = linkStorage.getByShortCode(shortCode)
  if (!link) {
    throw new Error('Not found')
  }
  return { data: link }
}

async function exportWithBackend() {
  return requestHandler<{ url: string; fileName: string }>(
    () => api.get('/links/export'),
    { success: 'CSV gerado com sucesso!' }
  )
}

async function exportWithStorage() {
  const links = linkStorage.getAll()
  exportToCsv(links)
  toast.success('CSV gerado com sucesso!')
  return {
    data: { url: '', fileName: 'links-export.csv' },
    errors: false as const,
  }
}

export const linkService = {
  async create(data: CreateLinkRequest) {
    return useBackend() ? createWithBackend(data) : createWithStorage(data)
  },

  async list(query?: ListLinksQuery): Promise<{ data: ILink[] }> {
    return useBackend() ? listWithBackend(query) : listWithStorage()
  },

  async delete(id: string) {
    return useBackend() ? deleteWithBackend(id) : deleteWithStorage(id)
  },

  async getByShortCode(shortCode: string): Promise<{ data: ILink }> {
    return useBackend()
      ? getByShortCodeWithBackend(shortCode)
      : getByShortCodeWithStorage(shortCode)
  },

  async export() {
    return useBackend() ? exportWithBackend() : exportWithStorage()
  },
}
