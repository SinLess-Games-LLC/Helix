import { HelixLogger } from '@helix/helix-utilities'
import { HelixDataSource } from './database.constants'

const logger = new HelixLogger({ name: 'database.functions' })

export async function initializeDatabase() {
  try {
    logger.info('Initializing Database...')
    await HelixDataSource.initialize()
    logger.info('Database initialized.')
  } catch (err: unknown) {
    logger.critical('Database Failed to Initialize')
    logger.error(err as string)
  }
  return HelixDataSource
}
