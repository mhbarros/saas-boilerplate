import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { SwaggerModule } from '@nestjs/swagger'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { DbModule } from './db/db.module'
import { CognitoModule } from './auth/cognito/cognito.module'

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Basic
        SENTRY_DSN: Joi.string().optional().allow(''),
        NODE_ENV: Joi.string().optional(),
        // AWS
        AWS_COGNITO_REGION: Joi.string().required(),
        AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
        AWS_COGNITO_CLIENT_ID: Joi.string().required(),
        AWS_COGNITO_CLIENT_SECRET: Joi.string().optional().allow(''),
        AWS_ACCESS_KEY_ID: Joi.string().optional().allow(''),
        AWS_SECRET_ACCESS_KEY: Joi.string().optional().allow(''),
      }),
    }),
    SwaggerModule,
    DbModule,
    CognitoModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }, AppService],
})
export class AppModule {}
