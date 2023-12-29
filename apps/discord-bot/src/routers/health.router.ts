import express from 'express'
import { cloudflareStatus, discordStatus } from '../utils/api.functions'
import { databaseHealthCheck } from '../utils/database.functions'

import { helix } from '../main'

export const HealthRouter = express.Router()

// Wrap the module code in an async IIFE
;(async () => {
  const data = {
    Status: {
      discord: await discordStatus(),
      cloudflare: await cloudflareStatus(),
      system: 'online',
      api: 'online',
      database: databaseHealthCheck(helix.Database),
      gateway: 'online',
      dashboard: 'online',
      bot: 'online',
    },
  }

  HealthRouter.get('/health', (req, res) => {
    res.send(data)
  })
})().catch(err => {
  console.error(err)
})
