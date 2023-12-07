/**
 * Configuration interface for Twitch settings.
 *
 * @interface ConfigTwitchInterface
 */
export interface ConfigTwitchInterface {
  /**
   * Client configuration for Twitch.
   *
   * @type {{
   *   id: string;
   *   secret: string;
   * }}
   */
  client: {
    /**
     * The client ID for Twitch authentication.
     *
     * @type {string}
     */
    id: string

    /**
     * The client secret for Twitch authentication.
     *
     * @type {string}
     */
    secret: string
  }
}
