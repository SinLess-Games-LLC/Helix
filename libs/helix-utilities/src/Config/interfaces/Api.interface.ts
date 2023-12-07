/**
 * Configuration interface for API settings.
 *
 * @interface ConfigApiInterface
 */
export interface ConfigApiInterface {
  /**
   * The port on which the API will run.
   *
   * @type {number}
   */
  port: number

  /**
   * Indicates whether folder functionality is enabled in the API.
   *
   * @type {boolean}
   */
  folder_enabled: boolean

  /**
   * JWT configuration for the API.
   *
   * @type {{
   *   secret: string;
   * }}
   */
  jwt: {
    /**
     * The secret key for JWT authentication in the API.
     *
     * @type {string}
     */
    secret: string
  }
}
