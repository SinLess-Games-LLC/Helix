/**
 * Configuration interface for Next.js settings.
 *
 * @interface ConfigNextInterface
 */
export interface ConfigNextInterface {
  /**
   * Authentication configuration for Next.js.
   *
   * @type {{
   *   secret: string;
   *   url: string;
   * }}
   */
  auth: {
    /**
     * Secret key used for authentication in Next.js.
     *
     * @type {string}
     */
    secret: string

    /**
     * URL used for authentication in Next.js.
     *
     * @type {string}
     */
    url: string
  }
}
