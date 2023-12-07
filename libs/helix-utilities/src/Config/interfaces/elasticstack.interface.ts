import { ConfigElasticsearchInterface } from './Elasticsearch.interface'
import { ConfigKibanaInterface } from './Kibana.interface'
import { ConfigLogstashInterface } from './Logstash.interface'

/**
 * Configuration interface for the Elastic Stack settings.
 *
 * @interface ConfigElasticStackInterface
 */
export interface ConfigElasticStackInterface {
  /**
   * Configuration for Elasticsearch within the Elastic Stack.
   *
   * @type {ConfigElasticsearchInterface}
   */
  search: ConfigElasticsearchInterface

  /**
   * Configuration for Kibana within the Elastic Stack.
   *
   * @type {ConfigKibanaInterface}
   */
  kibana: ConfigKibanaInterface

  /**
   * Configuration for Logstash within the Elastic Stack.
   *
   * @type {ConfigLogstashInterface}
   */
  logstash: ConfigLogstashInterface
}
