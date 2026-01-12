import { Readable } from 'node:stream'
import { db } from '@/infra/db'
import { makeRight, type Either } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { uuidv7 } from 'uuidv7'
import { links } from '@/infra/db/schemas'

type ExportLinksResult = {
  url: string
  fileName: string
}

export async function exportLinksToCsv(): Promise<
  Either<never, ExportLinksResult>
> {
  // Buscar todos os links
  const allLinks = await db.select().from(links)

  // Preparar dados para CSV
  const csvData = allLinks.map((link) => ({
    originalUrl: link.originalUrl,
    shortCode: link.shortCode,
    accessCount: link.accessCount.toString(),
    createdAt: link.createdAt.toISOString(),
  }))

  // Criar stream de CSV
  const csvStream = stringify(csvData, {
    header: true,
    columns: {
      originalUrl: 'URL Original',
      shortCode: 'URL Encurtada',
      accessCount: 'Contagem de Acessos',
      createdAt: 'Data de Criação',
    },
  })

  // Converter para Readable stream
  const readableStream = Readable.from(csvStream)

  // Gerar nome único do arquivo
  const timestamp = Date.now()
  const fileName = `${uuidv7()}-links-${timestamp}.csv`

  // Fazer upload para R2
  const { url } = await uploadFileToStorage({
    folder: 'downloads',
    fileName,
    contentType: 'text/csv',
    contentStream: readableStream,
  })

  return makeRight({
    url,
    fileName,
  })
}
