import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { getLinkByShortCodeRoute } from './routes/get-link-by-short-code'
import { listLinksRoute } from './routes/list-links'
import { exportLinksRoute } from './routes/export-links'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  // Envia o erro p/ alguma ferramenta de observabilidade (Sentry/DataDog/Grafana/OTel)
  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.get('/health', async () => {
  return { status: 'ok' }
})

server.register(createLinkRoute)
server.register(deleteLinkRoute)
server.register(getLinkByShortCodeRoute)
server.register(listLinksRoute)
server.register(exportLinksRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running on port ${env.PORT}!`)
})
