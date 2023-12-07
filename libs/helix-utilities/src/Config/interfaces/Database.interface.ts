import { ConfigMongoInterface } from './Mongo.interface'
import { ConfigMysqlInterface } from './Mysql.interface'
import { ConfigRedisInterface } from './Redis.interface'

/**
 * Configuration interface for database settings.
 *
 * @interface ConfigDatabaseInterface
 */
export interface ConfigDatabaseInterface {
  /**
   * Configuration for MongoDB.
   *
   * @type {ConfigMongoInterface}
   */
  mongo_db: ConfigMongoInterface

  /**
   * Configuration for MySQL.
   *
   * @type {ConfigMysqlInterface}
   */
  mysql: ConfigMysqlInterface

  /**
   * Configuration for Redis.
   *
   * @type {ConfigRedisInterface}
   */
  redis: ConfigRedisInterface
}
