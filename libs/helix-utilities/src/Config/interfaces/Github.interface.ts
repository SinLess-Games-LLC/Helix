/**
 * Configuration interface for GitHub settings.
 *
 * @interface ConfigGithubInterface
 */
export interface ConfigGithubInterface {
  /**
   * The client ID for GitHub authentication.
   *
   * @type {string}
   */
  id: string

  /**
   * The client secret for GitHub authentication.
   *
   * @type {string}
   */
  secret: string
}
