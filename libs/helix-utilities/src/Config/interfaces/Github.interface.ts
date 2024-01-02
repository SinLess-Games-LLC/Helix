/**
 * Configuration interface for GitHub settings.
 *
 * @interface ConfigGithubInterface
 */
export interface ConfigGithubInterface {
  credentials: {
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
  gitRemoteRepo: string
}
