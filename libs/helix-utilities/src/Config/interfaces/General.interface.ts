import { ConfigUserInterface } from './User.interface'

/**
 * Configuration interface for general settings.
 *
 * @interface ConfigGeneralInterface
 */
export interface ConfigGeneralInterface {
  /**
   * The author of the configuration.
   *
   * @type {string}
   */
  config_author: string

  /**
   * The debug level for logging purposes.
   *
   * @type {string}
   */
  debug_level: string

  /**
   * Indicates whether debug mode is enabled.
   *
   * @type {boolean}
   */
  debug: boolean

  /**
   * The version of the application.
   *
   * @type {string}
   */
  version: string

  /**
   * The version of the configuration.
   *
   * @type {string}
   */
  config_version: string

  /**
   * The timezone used by the application.
   *
   * @type {string}
   */
  timezone: string

  /**
   * The mode of the application.
   *
   * @type {string}
   */
  mode: string

  /**
   * A specifier for the application.
   *
   * @type {string}
   */
  app_specifier: string

  /**
   * Configuration for the admin user.
   *
   * @type {ConfigUserInterface}
   */
  admin: ConfigUserInterface
}
