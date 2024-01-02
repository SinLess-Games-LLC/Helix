/**
 * Configuration interface for logging settings.
 *
 * @interface ConfigLoggingInterface
 */
export interface ConfigLoggingInterface {
  enabled: boolean
  /**
   * Location configuration for logging.
   *
   * @type {{
   *   console: {
   *     enabled: boolean;
   *   };
   *   file: {
   *     enabled: boolean;
   *     path: string;
   *   };
   * }}
   */
  location: {
    /**
     * Console logging configuration.
     *
     * @type {{
     *   enabled: boolean;
     * }}
     */
    console: {
      /**
       * Indicates whether console logging is enabled.
       *
       * @type {boolean}
       */
      enabled: boolean
    }

    /**
     * File logging configuration.
     *
     * @type {{
     *   enabled: boolean;
     *   path: string;
     * }}
     */
    file: {
      /**
       * Indicates whether file logging is enabled.
       *
       * @type {boolean}
       */
      enabled: boolean

      /**
       * Path to the log file.
       *
       * @type {string}
       */
      path: string
    }
  }
}
