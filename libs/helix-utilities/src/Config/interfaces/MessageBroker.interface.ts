import { ConfigUserInterface } from './User.interface'
import { ConfigNetInterface } from './Net.interface'

/**
 * Configuration interface for message broker settings.
 *
 * @interface ConfigMessageBrokerInterface
 */
export interface ConfigMessageBrokerInterface {
  /**
   * Configuration for RabbitMQ message broker.
   *
   * @type {{
   *   rabbitmq: {
   *     user: ConfigUserInterface;
   *     net: ConfigNetInterface;
   *   };
   * }}
   */
  brokers: {
    rabbitmq: {
      /**
       * User configuration for RabbitMQ.
       *
       * @type {ConfigUserInterface}
       */
      user: ConfigUserInterface

      /**
       * Network configuration for RabbitMQ.
       *
       * @type {ConfigNetInterface}
       */
      net: ConfigNetInterface
    }
  }
}
