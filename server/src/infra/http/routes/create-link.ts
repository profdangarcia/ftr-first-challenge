import { createLink } from '@/app/functions/create-link'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { InvalidUrlError } from '@/app/functions/errors/invalid-url'
import { ShortCodeAlreadyExistsError } from '@/app/functions/errors/short-code-already-exists'
import { InvalidShortCodeError } from '@/app/functions/errors/invalid-short-code'

const createLinkBodySchema = z.object({
  originalUrl: z.string().url('Formato de URL inválido'),
  shortCode: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, 'O link encurtado pode conter apenas letras, números, hífens e underscores')
    .optional(),
})

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        body: createLinkBodySchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            originalUrl: z.string().url(),
            shortCode: z.string(),
            accessCount: z.number(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortCode } = request.body

      const result = await createLink(originalUrl, shortCode)

      if (isLeft(result)) {
        const error = unwrapEither(result)

        if (error instanceof InvalidUrlError) {
          return reply.status(400).send({ message: error.message })
        }

        if (error instanceof InvalidShortCodeError) {
          return reply.status(400).send({ message: error.message })
        }

        if (error instanceof ShortCodeAlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }
      }

      const link = unwrapEither(result)

      return reply.status(201).send({
        ...link,
        createdAt: link.createdAt.toISOString(),
        updatedAt: link.updatedAt.toISOString(),
      })
    }
  )
}
