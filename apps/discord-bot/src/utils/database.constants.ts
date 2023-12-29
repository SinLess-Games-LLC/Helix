import { HelixLogger, HelixConfiguration } from '@helix/helix-utilities'
import entities from '@helix/entities'
import { DataSource } from 'typeorm'

const logger = new HelixLogger({ name: 'database.constants' })
const config = new HelixConfiguration()

export const HelixDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: config.database.mysql.net.host,
  port: config.database.mysql.net.port,
  username: config.database.mysql.user.username,
  password: config.database.mysql.user.password,
  database: config.database.mysql.database.name,
  entities: entities,
  logging: config.logging.enabled,
})

logger.info('testing')
