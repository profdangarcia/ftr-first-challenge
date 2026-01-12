import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { makeLeft, makeRight, type Either } from '@/infra/shared/either'
import { LinkNotFoundError } from './errors/link-not-found'
import { links } from '@/infra/db/schemas'

export async function deleteLink(
  id: string
): Promise<Either<LinkNotFoundError, void>> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1)

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  await db.delete(links).where(eq(links.id, id))

  return makeRight(undefined)
}
