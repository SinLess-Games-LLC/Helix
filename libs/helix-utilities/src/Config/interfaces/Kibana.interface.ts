import { ConfigNetInterface } from './Net.interface'
import { ConfigUserInterface } from './User.interface'

/**
 * Configuration interface for Kibana settings.
 *
 * @interface ConfigKibanaInterface
 */
export interface ConfigKibanaInterface {
  /**
   * Network configuration for Kibana.
   *
   * @type {ConfigNetInterface}
   */
  net: ConfigNetInterface

  /**
   * User configuration for Kibana.
   *
   * @type {ConfigUserInterface}
   */
  user: ConfigUserInterface
}
