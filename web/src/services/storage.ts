/**
 * Camada de persistência em tempo de execução (sessionStorage + memória).
 * Usada quando VITE_USE_BACKEND=false.
 */

import type { ILink } from '@/types/link'

const STORAGE_KEY = 'brevly_links'

let memoryCache: ILink[] | null = null

function loadFromStorage(): ILink[] {
  if (memoryCache !== null) return memoryCache
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    memoryCache = raw ? (JSON.parse(raw) as ILink[]) : []
  } catch {
    memoryCache = []
  }
  return memoryCache
}

function persist(links: ILink[]): void {
  memoryCache = links
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(links))
  } catch {
    // sessionStorage cheio ou indisponível; mantém só em memória
  }
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `local-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function now(): string {
  return new Date().toISOString()
}

export const linkStorage = {
  getAll(): ILink[] {
    return [...loadFromStorage()]
  },

  create(data: { originalUrl: string; shortCode?: string }): ILink {
    const links = loadFromStorage()
    const shortCode =
      data.shortCode?.trim() ||
      Math.random().toString(36).slice(2, 10)
    const exists = links.some((l) => l.shortCode === shortCode)
    const finalShortCode = exists
      ? `${shortCode}-${Date.now().toString(36)}`
      : shortCode
    const link: ILink = {
      id: generateId(),
      originalUrl: data.originalUrl,
      shortCode: finalShortCode,
      accessCount: 0,
      createdAt: now(),
      updatedAt: now(),
    }
    links.push(link)
    persist(links)
    return link
  },

  delete(id: string): boolean {
    const links = loadFromStorage().filter((l) => l.id !== id)
    if (links.length === loadFromStorage().length) return false
    persist(links)
    return true
  },

  getByShortCode(shortCode: string): ILink | null {
    return loadFromStorage().find((l) => l.shortCode === shortCode) ?? null
  },

  incrementAccessCount(id: string): void {
    const links = loadFromStorage()
    const index = links.findIndex((l) => l.id === id)
    if (index === -1) return
    links[index] = {
      ...links[index],
      accessCount: links[index].accessCount + 1,
      updatedAt: now(),
    }
    persist(links)
  },
}
