/**
 * Configuration interface for Auth0 settings.
 *
 * @interface ConfigAuth0Interface
 */
export interface ConfigAuth0Interface {
  /**
   * The secret key for Auth0.
   *
   * @type {string}
   */
  secret: string

  /**
   * The base URL for Auth0.
   *
   * @type {string}
   */
  base_url: string

  /**
   * Issuer configuration for Auth0.
   *
   * @type {{
   *   base_url: string;
   * }}
   */
  issuer: {
    /**
     * The base URL for the Auth0 issuer.
     *
     * @type {string}
     */
    base_url: string
  }

  /**
   * Client configuration for Auth0.
   *
   * @type {{
   *   id: string;
   *   secret: string;
   * }}
   */
  client: {
    /**
     * The client ID for Auth0.
     *
     * @type {string}
     */
    id: string

    /**
     * The client secret for Auth0.
     *
     * @type {string}
     */
    secret: string
  }

  /**
   * The audience for Auth0.
   *
   * @type {string}
   */
  audience: string

  /**
   * The scope for Auth0.
   *
   * @type {string}
   */
  scope: string
}
