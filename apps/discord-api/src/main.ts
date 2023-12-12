/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger('bootstrap')

  logger.log('Starting Discord API...')
  logger.debug('Creating NestFactory...')
  const app = await NestFactory.create(AppModule)
  logger.debug('NestFactory created.')
  logger.debug('Setting global prefix...')
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  logger.debug('Global prefix set.')
  logger.log('Starting application...')

  const config = new DocumentBuilder()
    .setTitle('Discord API')
    .setDescription('The Discord API description')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  logger.debug('Getting port...')
  const port = process.env.PORT || 8001
  logger.debug(`Port: ${port}`)
  logger.debug('Listening...')
  await app.listen(port)
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
