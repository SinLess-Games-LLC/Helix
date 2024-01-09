import express from 'express'
import {
  cloudflareStatus,
  discordStatus,
  status,
  statusCompareToBoolean,
} from '../utils/api.functions'

import { helix } from '../main'
import { HelixLogger } from '@helix/helix-utilities'

export const HealthRouter = express.Router()

const logger = new HelixLogger({ name: 'health.router' })

// Wrap the module code in an async IIFE
;(async () => {
  logger.info('Fetching status from Discord and Cloudflare')
  const ds = await discordStatus()
  logger.info('Discord status fetched successfully')
  const cs = await cloudflareStatus()
  logger.info('Cloudflare status fetched successfully')

  function checkSystemStatus(...systems: boolean[]) {
    const totalSystems = systems.length
    const operationalSystems = systems.filter(status => status === true).length

    const percentageOperational = (operationalSystems / totalSystems) * 100

    if (percentageOperational === 100) {
      return 'All systems operational'
    } else if (percentageOperational >= 85) {
      return 'Minor outage'
    } else if (percentageOperational >= 75) {
      return 'Major outage'
    } else if (percentageOperational >= 50) {
      return 'Degraded'
    } else {
      return 'Not all systems are operational'
    }
  }

  HealthRouter.get('/health', (req, res) => {
    res.send({
      status: {
        indicator: '',
        description: checkSystemStatus(
          // helix.Database.isInitialized,
          helix.cache.isReady,
          helix.ready,
          statusCompareToBoolean(ds),
          statusCompareToBoolean(cs)
        ),
      },
      'Third-Party': {
        discord: ds,
        cloudflare: cs,
      },
      Helix: {
        // database: status(helix.Database.isInitialized),
        cache: status(helix.cache.isReady),
        bot: status(helix.ready),
      },
    })
  })
})().catch((err: unknown) => {
  logger.critical('An Error occurred in the health router')
  logger.error(err as string)
})
