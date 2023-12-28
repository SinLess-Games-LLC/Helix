import {
  ColorResolvable,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js'
import { CommandGroup } from '../../enums/command.group.enum'
import { HelixClient } from '../../utils/helix.client'

module.exports = {
  group: CommandGroup.Utility,
  data: new SlashCommandBuilder()
    .setName('bot-invite')
    .setDescription('Replies with bot invite url'),
  async execute(interaction: Interaction & { client: HelixClient }) {
    const em = new EmbedBuilder()
    em.setTitle('Bot Invite Link')
    em.setColor(interaction.client.Colors.bot.pink as ColorResolvable)
    em.setFields({
      name: 'Invite Link',
      value: interaction.client.config.discord.application.client.bot.invite_url,
      inline: true,
    })
    em.setImage(
      'https://cdn.discordapp.com/avatars/1143176646074052698/0a56c831ad30bf8297c6020106e4754f.png?size=4096&format=webp&width=1152&height=0'
    )
    await interaction.channel.send({ embeds: [em] })
    return await interaction.channel.send({ content: 'Invite me to your server!' })
  },
}
