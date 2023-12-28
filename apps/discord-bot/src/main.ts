import { HelixClient } from './utils/helix.client'
import { IntentsBitField } from 'discord.js'
import { HelixLogger } from '@helix/helix-utilities'

const logger = new HelixLogger({ name: 'Bootstrap' })

/**
 * Bootstraps the Helix application.
 *
 * This function initializes the HelixClient, sets up Discord intents, and starts the application.
 * It also logs in and logs a message when the client is ready.
 *
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when the Helix application is successfully bootstrapped.
 * @throws {Error} If there is an error during the bootstrap process.
 */
async function bootstrap(): Promise<void> {
  /**
   * Represents the Discord intents configuration for the HelixClient.
   *
   * Intents define which events the bot will receive from Discord.
   * The value is calculated using the Discord Intents Calculator.
   *
   * @see {@link https://discord-intents-calculator.vercel.app/|Discord Intents Calculator}
   *
   * @type {IntentsBitField}
   * @constant
   * @memberof bootstrap
   * @inner
   */
  const intents: IntentsBitField = new IntentsBitField(3276799)

  /**
   * The HelixClient instance responsible for running the application.
   *
   * @type {HelixClient}
   * @constant
   * @memberof bootstrap
   * @inner
   */
  const helix: HelixClient = new HelixClient({
    intents: intents,
    shards: 'auto',
  })

  /**
   * Starts the Helix application, including logging in and setting up necessary components.
   *
   * @async
   * @method
   * @memberof bootstrap
   * @inner
   */
  await helix.start()
}

// Initiates the bootstrap process and handles any potential errors.
bootstrap()
  .then(() => {
    logger.info('[BOOTSTRAP] | Helix application successfully bootstrapped.')
  })
  .catch(error => {
    logger.error(`[BOOTSTRAP] | An error occurred during the bootstrap process: ${error}`)
  })
