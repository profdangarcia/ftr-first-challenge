import { exportLinksToCsv } from '@/app/functions/export-links-to-csv'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { unwrapEither } from '@/infra/shared/either'

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links/export',
    {
      schema: {
        response: {
          200: z.object({
            url: z.string().url(),
            fileName: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinksToCsv()
      const exportResult = unwrapEither(result)

      return reply.send(exportResult)
    }
  )
}
