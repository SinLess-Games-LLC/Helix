/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { HelixLogger } from '@helix/helix-utilities'

async function bootstrap() {
  const logger = new HelixLogger({ name: 'DiscordApi', level: 'debug' })

  logger.info('Starting Discord API')
  logger.info('Configuring NestJS')
  const app = await NestFactory.create(AppModule)
  logger.info('Setting Global Prefix')
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  logger.info('Starting Application')
  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.info(`Application Started on Port: ${port}`)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
