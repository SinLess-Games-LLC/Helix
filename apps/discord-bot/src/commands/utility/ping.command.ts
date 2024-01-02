import { ColorResolvable, EmbedBuilder, Interaction, SlashCommandBuilder } from 'discord.js'
import { CommandGroup } from '../../enums/command.group.enum'
import { HelixClient } from '../../utils/helix.client'

module.exports = {
  group: CommandGroup.Utility,
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: Interaction & { client: HelixClient }) {
    const em = new EmbedBuilder()
    em.setTitle('Ping')
    em.setColor(interaction.client.Colors.bot.pink as ColorResolvable)
    em.setFields(
      { name: 'Bot Ping', value: `${interaction.client.ws.ping} ms`, inline: true },
      {
        name: 'API Ping',
        value: `${Date.now() - interaction.createdTimestamp} ms`,
        inline: true,
      },
      {
        name: 'Latency',
        value: `${Math.round(interaction.client.ws.ping)} ms`,
        inline: true,
      }
    )
    em.setImage('https://www.netblazr.com/wp-content/uploads/2020/06/Low-latency-icon-300x288.png')
    await interaction.channel.send({ embeds: [em] })

    return await interaction.channel.send({ content: 'Here is the ping!' })
  },
}
