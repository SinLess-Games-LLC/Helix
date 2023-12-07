import { ConfigUserInterface } from './User.interface'
import { ConfigNetInterface } from './Net.interface'

/**
 * Configuration interface for Redis settings.
 *
 * @interface ConfigRedisInterface
 */
export interface ConfigRedisInterface {
  /**
   * User configuration for Redis.
   *
   * @type {ConfigUserInterface}
   */
  user: ConfigUserInterface

  /**
   * Network configuration for Redis.
   *
   * @type {ConfigNetInterface}
   */
  net: ConfigNetInterface
}
