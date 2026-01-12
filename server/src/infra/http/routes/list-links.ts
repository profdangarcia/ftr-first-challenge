import { listLinks } from '@/app/functions/list-links'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { unwrapEither } from '@/infra/shared/either'

const listLinksQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(100),
})

export const listLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links',
    {
      schema: {
        querystring: listLinksQuerySchema,
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              originalUrl: z.string().url(),
              shortCode: z.string(),
              accessCount: z.number(),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { page, limit } = request.query

      const result = await listLinks(page, limit)
      const links = unwrapEither(result)

      return reply.send(
        links.map((link) => ({
          ...link,
          createdAt: link.createdAt.toISOString(),
          updatedAt: link.updatedAt.toISOString(),
        }))
      )
    }
  )
}
