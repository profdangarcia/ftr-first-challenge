import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { makeLeft, makeRight, type Either } from '@/infra/shared/either'
import { InvalidUrlError } from './errors/invalid-url'
import { ShortCodeAlreadyExistsError } from './errors/short-code-already-exists'
import { InvalidShortCodeError } from './errors/invalid-short-code'
import { uuidv7 } from 'uuidv7'
import { links } from '@/infra/db/schemas'

function generateShortCode(): string {
  // Gera um código de 8 caracteres usando uuidv7 e base64url
  const uuid = uuidv7()
  // Remove hífens e usa apenas os primeiros 8 caracteres
  return uuid.replace(/-/g, '').substring(0, 8)
}

async function ensureUniqueShortCode(): Promise<string> {
  let shortCode = generateShortCode()
  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    const existing = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1)

    if (existing.length === 0) {
      return shortCode
    }

    shortCode = generateShortCode()
    attempts++
  }

  throw new Error('Failed to generate unique short code after multiple attempts')
}

function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

function isValidShortCode(shortCode: string): boolean {
  // Permite apenas letras, números, hífens e underscores
  return /^[a-zA-Z0-9_-]+$/.test(shortCode)
}

type CreateLinkResult = {
  id: string
  originalUrl: string
  shortCode: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

export async function createLink(
  originalUrl: string,
  customShortCode?: string
): Promise<
  Either<
    InvalidUrlError | ShortCodeAlreadyExistsError | InvalidShortCodeError,
    CreateLinkResult
  >
> {
  if (!isValidUrl(originalUrl)) {
    return makeLeft(new InvalidUrlError())
  }

  let shortCodeToUse: string

  if (customShortCode) {
    if (!isValidShortCode(customShortCode)) {
      return makeLeft(new InvalidShortCodeError())
    }

    // Verifica se o código já existe
    const existing = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, customShortCode))
      .limit(1)

    if (existing.length > 0) {
      return makeLeft(new ShortCodeAlreadyExistsError())
    }

    shortCodeToUse = customShortCode
  } else {
    shortCodeToUse = await ensureUniqueShortCode()
  }

  try {
    const [link] = await db
      .insert(links)
      .values({
        originalUrl,
        shortCode: shortCodeToUse,
        accessCount: 0,
      })
      .returning()

    return makeRight(link)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('unique constraint')
    ) {
      // Fallback caso o shortCode ainda exista após verificação
      return makeLeft(new ShortCodeAlreadyExistsError())
    }
    throw error
  }
}
