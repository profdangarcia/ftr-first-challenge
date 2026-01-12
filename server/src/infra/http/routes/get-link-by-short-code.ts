import { getLinkByShortCode } from '@/app/functions/get-link-by-short-code'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { LinkNotFoundError } from '@/app/functions/errors/link-not-found'

const getLinkByShortCodeParamsSchema = z.object({
  shortCode: z.string(),
})

export const getLinkByShortCodeRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.get(
    '/links/:shortCode',
    {
      schema: {
        params: getLinkByShortCodeParamsSchema,
        response: {
          200: z.object({
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
      const { shortCode } = request.params

      const result = await getLinkByShortCode(shortCode)

      if (isLeft(result)) {
        const error = unwrapEither(result)

        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }
      }

      const link = unwrapEither(result)

      return reply.send({
        ...link,
        createdAt: link.createdAt.toISOString(),
        updatedAt: link.updatedAt.toISOString(),
      })
    }
  )
}
