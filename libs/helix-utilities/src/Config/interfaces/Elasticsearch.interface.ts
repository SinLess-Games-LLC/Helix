import { ConfigNetInterface } from './Net.interface'
import { ConfigUserInterface } from './User.interface'

/**
 * Configuration interface for Elasticsearch settings.
 *
 * @interface ConfigElasticsearchInterface
 */
export interface ConfigElasticsearchInterface {
  /**
   * Network configuration for Elasticsearch.
   *
   * @type {ConfigNetInterface}
   */
  net: ConfigNetInterface

  /**
   * User configuration for Elasticsearch.
   *
   * @type {ConfigUserInterface}
   */
  user: ConfigUserInterface
}
