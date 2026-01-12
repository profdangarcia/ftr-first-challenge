import { desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { makeRight, type Either } from '@/infra/shared/either'
import { links } from '@/infra/db/schemas'

type Link = {
  id: string
  originalUrl: string
  shortCode: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

export async function listLinks(
  page: number = 1,
  limit: number = 100
): Promise<Either<never, Link[]>> {
  const offset = (page - 1) * limit

  const results = await db
    .select()
    .from(links)
    .orderBy(desc(links.createdAt))
    .limit(limit)
    .offset(offset)

  return makeRight(results)
}
