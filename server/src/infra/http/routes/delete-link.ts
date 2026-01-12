import { deleteLink } from '@/app/functions/delete-link'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { LinkNotFoundError } from '@/app/functions/errors/link-not-found'

const deleteLinkParamsSchema = z.object({
  id: z.string().uuid(),
})

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/:id',
    {
      schema: {
        params: deleteLinkParamsSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink(id)

      if (isLeft(result)) {
        const error = unwrapEither(result)

        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }
      }

      return reply.status(204).send()
    }
  )
}
