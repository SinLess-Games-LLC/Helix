import { ConfigNetInterface } from './Net.interface'
import { ConfigUserInterface } from './User.interface'

/**
 * Configuration interface for Consul settings.
 *
 * @interface ConfigConsulInterface
 */
export interface ConfigConsulInterface {
  /**
   * Network configuration for Consul.
   *
   * @type {ConfigNetInterface}
   */
  net: ConfigNetInterface

  /**
   * User configuration for Consul.
   *
   * @type {ConfigUserInterface}
   */
  user: ConfigUserInterface
}
