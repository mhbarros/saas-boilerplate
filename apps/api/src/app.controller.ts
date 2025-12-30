import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers()
  }

  @Get('/users/123')
  async insertUser() {
    await this.appService.insertUser()
    return true
  }
}
