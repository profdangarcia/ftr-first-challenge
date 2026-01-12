import { eq, sql } from 'drizzle-orm'
import { db } from '@/infra/db'
import { makeLeft, makeRight, type Either } from '@/infra/shared/either'
import { LinkNotFoundError } from './errors/link-not-found'
import { links } from '@/infra/db/schemas'

type GetLinkResult = {
  id: string
  originalUrl: string
  shortCode: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

export async function getLinkByShortCode(
  shortCode: string
): Promise<Either<LinkNotFoundError, GetLinkResult>> {
  // Busca e incrementa o accessCount de forma atômica
  const [link] = await db
    .update(links)
    .set({
      accessCount: sql`${links.accessCount} + 1`,
      updatedAt: sql`NOW()`,
    })
    .where(eq(links.shortCode, shortCode))
    .returning()

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight(link)
}
