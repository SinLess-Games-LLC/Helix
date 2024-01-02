import { Events, Interaction } from 'discord.js'
import { HelixLogger } from '@helix/helix-utilities'
import { EventGroup } from '../../enums/event.group.enum'
import { HelixClient } from '../../utils/helix.client'

const event = {
  enabled: true,
  name: Events.InteractionCreate,
  group: EventGroup.Client,
  once: false,
  async execute(interaction: Interaction & { client: HelixClient }) {
    const logger = new HelixLogger({ name: 'Interaction Create Event' })

    if (!interaction.isCommand()) return
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    logger.info(`Interaction received: ${command.data.name}`)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      command.execute(interaction)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      }
    }
  },
}

module.exports = event
