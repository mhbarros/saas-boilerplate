import './instrument'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  const SWAGGER_TITLE = 'NestJS Boilerplate'
  const SWAGGER_DESCRIPTION = 'The perfect boilerplate to start NestJS projects'
  const SWAGGER_VERSION = '1.0'
  const SWAGGER_TAG = 'boilerplate'
  const SWAGGER_ROUTE = 'api'

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addTag(SWAGGER_TAG)
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(SWAGGER_ROUTE, app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
