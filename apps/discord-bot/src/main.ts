import 'reflect-metadata'
import { HelixLogger } from '@helix/helix-utilities'
import { HelixClient } from './utils/helix.client'
import { IntentsBitField } from 'discord.js'

const logger = new HelixLogger({ name: 'Bootstrap' })
const intents: IntentsBitField = new IntentsBitField(3276799)
export const helix: HelixClient = new HelixClient({
  intents: intents,
  shards: 'auto',
})

function handleSigint() {
  logger.info('Received SIGINT. Stopping Helix application...')
  helix
    .stop()
    .then(() => {
      process.exitCode = 0
      process.exit()
    })
    .catch(error => {
      process.exitCode = 1
      logger.error(error as string)
    })
}

// Handle SIGINT (Ctrl+C) to stop the application gracefully
process.on('SIGINT', handleSigint)

async function bootstrap(): Promise<void> {
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
