/**
 * Configuration interface for network-related settings.
 *
 * @interface ConfigNetInterface
 */
export interface ConfigNetInterface {
  /**
   * The host address associated with the configuration.
   *
   * @type {string | undefined}
   * @description Use `undefined` if not specified, allowing the system to use the default.
   */
  host: string | undefined

  /**
   * The port number associated with the configuration.
   *
   * @type {number | undefined}
   * @description Use `undefined` if not specified, allowing the system to use the default.
   */
  port: number | undefined
}
