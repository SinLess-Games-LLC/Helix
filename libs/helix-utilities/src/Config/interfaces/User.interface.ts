/**
 * Configuration interface for user-related settings.
 *
 * @interface ConfigUserInterface
 */
export interface ConfigUserInterface {
  /**
   * The username associated with the configuration.
   *
   * @type {string | undefined}
   */
  username: string | undefined

  /**
   * The password associated with the configuration.
   *
   * @type {string | undefined}
   */
  password: string | undefined
}
