/**
 * Helper para converter dados em CSV e disparar o download.
 * Útil no modo sem backend (VITE_USE_BACKEND=false).
 */

import type { ILink } from '@/types/link'

const CSV_HEADERS = [
  'id',
  'originalUrl',
  'shortCode',
  'accessCount',
  'createdAt',
  'updatedAt',
] as const

function escapeCsvField(value: string): string {
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * Converte um array de ILink em string CSV (com cabeçalho).
 */
export function parseLinksToCsv(links: ILink[]): string {
  const headerLine = CSV_HEADERS.join(',')
  const rows = links.map((link) =>
    CSV_HEADERS.map((key) => escapeCsvField(String(link[key] ?? ''))).join(',')
  )
  return [headerLine, ...rows].join('\n')
}

/**
 * Gera um arquivo CSV a partir dos links e dispara o download no navegador.
 * @param links - Lista de links a exportar
 * @param filename - Nome do arquivo (sem extensão). Padrão: "links-export"
 */
export function exportToCsv(links: ILink[], filename = 'links-export'): void {
  const csv = parseLinksToCsv(links)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
