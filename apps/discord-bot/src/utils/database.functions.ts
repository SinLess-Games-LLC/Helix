import { HelixLogger } from '@helix/helix-utilities'
import { HelixDataSource } from './database.constants'
import { DataSource } from 'typeorm'

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

export function databaseHealthCheck(datasource: DataSource) {
  try {
    if (datasource.isInitialized) {
      return 'Operational'
    } else {
      return 'Database Down'
    }
  } catch (err: unknown) {
    logger.critical('An Error Occurred while Initializing the Database.')
    logger.error(err as string)
  }
}
