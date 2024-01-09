import { HelixLogger, HelixConfiguration } from '@helix/helix-utilities'
import { entities } from '@helix/entities'
import { DataSource } from 'typeorm'
import { createClient } from 'redis'

const logger = new HelixLogger({ name: 'database.constants' })
const config = new HelixConfiguration()

export const HelixDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: config.database.mysql.net.host,
  port: config.database.mysql.net.port,
  username: config.database.mysql.user.username,
  password: config.database.mysql.user.password,
  database: config.database.mysql.database.name,
  charset: 'utf8mb4', // config.database.mysql.database.charset,
  synchronize: true,
  entities: entities,
  logging: config.logging.enabled,
  debug: config.general.debug,
  migrationsTableName: 'Helix-Migrations',
  metadataTableName: 'Helix-Metadata',
  cache: {
    type: 'redis',
    duration: 30000, // 30 seconds
    tableName: 'helix_ai',
    options: {
      host: config.database.redis.net.host,
      port: config.database.redis.net.port,
    },
  },
})

export async function getRedisClient() {
  return await createClient({
    url: `redis://${config.database.redis.net.host}:${config.database.redis.net.port}/0`,
  })
    .on('error', err => logger.error(`Redis Client Error: ${err}`))
    .connect()
}
