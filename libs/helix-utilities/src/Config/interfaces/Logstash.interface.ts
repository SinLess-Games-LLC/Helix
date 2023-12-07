import { ConfigNetInterface } from './Net.interface'
import { ConfigUserInterface } from './User.interface'

/**
 * Configuration interface for Logstash settings.
 *
 * @interface ConfigLogstashInterface
 */
export interface ConfigLogstashInterface {
  /**
   * Network configuration for Logstash.
   *
   * @type {ConfigNetInterface}
   */
  net: ConfigNetInterface

  /**
   * User configuration for Logstash.
   *
   * @type {ConfigUserInterface}
   */
  user: ConfigUserInterface
}
