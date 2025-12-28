import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { SwaggerModule } from '@nestjs/swagger'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SENTRY_DSN: Joi.string().optional(),
        NODE_ENV: Joi.string().optional(),
      }),
    }),
    SwaggerModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }, AppService],
})
export class AppModule {}
