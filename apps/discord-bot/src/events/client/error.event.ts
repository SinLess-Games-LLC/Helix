import { Events } from 'discord.js'
import { HelixLogger } from '@helix/helix-utilities'
import { EventGroup } from '../../enums/event.group.enum'

const event = {
  enabled: false,
  name: Events.Error,
  group: EventGroup.Client,
  once: false,
  execute(error: any) {
    const logger = new HelixLogger({ name: 'Client Error Event' })
    logger.error(`An Error Occurred: ${error}`)
  },
}

module.exports = event
