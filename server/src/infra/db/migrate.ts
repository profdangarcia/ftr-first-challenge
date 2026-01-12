import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { env } from '@/env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function runMigrations() {
  const connection = postgres(env.DATABASE_URL, { max: 1 })
  const db = drizzle(connection)

  console.log('Running migrations...')

  const migrationsFolder = join(__dirname, 'migrations')

  await migrate(db, {
    migrationsFolder,
  })

  console.log('Migrations completed successfully!')

  await connection.end()
}

runMigrations().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
