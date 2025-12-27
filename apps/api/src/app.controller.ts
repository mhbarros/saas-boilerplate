import { Controller, Get, Req, Res } from '@nestjs/common'
import { AppService } from './app.service'
import type { FastifyReply, FastifyRequest } from 'fastify'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response: FastifyReply, @Req() request: FastifyRequest): string {
    response.status(302).redirect('/api')
    return this.appService.getHello()
  }
}
