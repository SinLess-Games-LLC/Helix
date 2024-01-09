/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 8000
  await app.listen(port)
  logger.log(`🚀 Application is running on: http://localhost:${port}/`)
}

bootstrap()
  .then(() => Logger.log('🚀 Application bootstrapped', 'Bootstrap'))
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
