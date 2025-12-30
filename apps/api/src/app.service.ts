import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { DRIZZLE_CLIENT } from './db/providers/drizzle.provider'
import { users } from './db/schema'

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_CLIENT)
    private readonly db: NodePgDatabase
  ) {}
  getHello(): string {
    return 'Hello World!'
  }

  async getUsers(): Promise<any> {
    const response = await this.db.select({ id: users.id, name: users.name, email: users.email }).from(users)
    return response
  }

  async insertUser() {
    await this.db.insert(users).values({
      name: 'Marcelo Barros',
      email: 'mhbarros99@gmail.com',
    })
  }
}
