import { Provider } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schema'
import { Pool } from 'pg'
import { ConfigService } from '@nestjs/config'

export const DRIZZLE_CLIENT = 'DRIZZLE_CLIENT'

export const DrizzleProvider: Provider = {
  provide: DRIZZLE_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.getOrThrow<string>('DB_URL')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const pool = new Pool({ connectionString })
    const db = drizzle(pool, { schema })
    return db
  },
}
