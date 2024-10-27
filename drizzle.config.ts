import 'dotenv/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: process.env.TURSO_CONNECTION_URL!,
    token: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
}
