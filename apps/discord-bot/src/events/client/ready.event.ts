import { Events } from 'discord.js'
import { HelixClient } from '../../utils/helix.client'
import { HelixLogger } from '@helix/helix-utilities'
import { EventGroup } from '../../enums/event.group.enum'

const event = {
  enabled: true,
  name: Events.ClientReady,
  group: EventGroup.Client,
  once: true,
  execute(client: HelixClient) {
    const logger = new HelixLogger({ name: 'Client Ready Event' })
    logger.info(`Ready! Logged in as ${client.user.tag}`)
  },
}

module.exports = event
