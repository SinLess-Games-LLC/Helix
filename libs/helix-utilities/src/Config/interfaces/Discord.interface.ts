import { ConfigNetInterface } from './Net.interface'

/**
 * Configuration interface for Discord settings.
 *
 * @interface ConfigDiscordInterface
 */
export interface ConfigDiscordInterface {
  /**
   * Application configuration for Discord.
   *
   * @type {{
   *   id: number;
   * }}
   */
  application: {
    /**
     * The ID of the Discord application.
     *
     * @type {number}
     */
    id: number
  }

  /**
   * Bot configuration for Discord.
   *
   * @type {{
   *   token: string;
   *   default_prefix: string;
   *   invite_url: string;
   * }}
   */
  bot: {
    /**
     * The token for the Discord bot.
     *
     * @type {string}
     */
    token: string

    /**
     * The default prefix for the Discord bot.
     *
     * @type {string}
     */
    default_prefix: string

    /**
     * The invite URL for the Discord bot.
     *
     * @type {string}
     */
    invite_url: string
  }

  /**
   * Client configuration for Discord.
   *
   * @type {{
   *   id: number;
   *   secret: string;
   * }}
   */
  client: {
    /**
     * The ID of the Discord client.
     *
     * @type {number}
     */
    id: number

    /**
     * The secret for the Discord client.
     *
     * @type {string}
     */
    secret: string
  }

  /**
   * Support server configuration for Discord.
   *
   * @type {{
   *   invite_url: string;
   * }}
   */
  support_server: {
    /**
     * The invite URL for the Discord support server.
     *
     * @type {string}
     */
    invite_url: string
  }

  /**
   * The public key for Discord.
   *
   * @type {string}
   */
  public_key: string

  /**
   * List of developer user IDs for Discord.
   *
   * @type {number[]}
   */
  developers: number[]

  /**
   * List of tester user IDs for Discord.
   *
   * @type {number[]}
   */
  testers: number[]

  /**
   * OAuth configuration for Discord.
   *
   * @type {{
   *   redirect_url: string;
   * }}
   */
  oauth: {
    /**
     * The redirect URL for Discord OAuth.
     *
     * @type {string}
     */
    redirect_url: string
  }

  /**
   * Lavalink configuration for Discord.
   *
   * @type {{
   *   password: string;
   *   net: ConfigNetInterface;
   * }}
   */
  lava_link: {
    /**
     * The password for Lavalink in Discord.
     *
     * @type {string}
     */
    password: string

    /**
     * Network configuration for Lavalink in Discord.
     *
     * @type {ConfigNetInterface}
     */
    net: ConfigNetInterface
  }
}
