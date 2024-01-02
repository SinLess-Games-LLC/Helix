import { Events } from 'discord.js'
import { HelixLogger } from '@helix/helix-utilities'
import { EventGroup } from '../../enums/event.group.enum'

const event = {
  enabled: false,
  name: Events.Debug,
  group: EventGroup.Client,
  once: false,
  execute(debug: string) {
    const logger = new HelixLogger({ name: 'Client Debug Event' })
    logger.debug(debug)
  },
}

module.exports = event
