/**
 * Configuration interface for Google settings.
 *
 * @interface ConfigGoogleInterface
 */
export interface ConfigGoogleInterface {
  /**
   * Client configuration for Google.
   *
   * @type {{
   *   id: string;
   *   secret: string;
   * }}
   */
  client: {
    /**
     * The client ID for Google authentication.
     *
     * @type {string}
     */
    id: string

    /**
     * The client secret for Google authentication.
     *
     * @type {string}
     */
    secret: string
  }
}
