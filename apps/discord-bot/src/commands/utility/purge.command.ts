import {
  ChatInputCommandInteraction,
  Collection,
  Message,
  MessageManager,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
} from 'discord.js'
import { wait } from '../../utils/bot.constants'
import { CommandGroup } from '../../enums/command.group.enum'

module.exports = {
  group: CommandGroup.Utility,
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription(
      'Find and delete the last 100 messages that contain the specified character string.'
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName('amount')
        .setDescription('How many messages should be deleted?')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: ChatInputCommandInteraction) {
    const channelMessages = interaction.channel?.messages as MessageManager
    const amount = interaction.options.getInteger('amount')

    if (amount > 100) {
      return interaction.reply('You can only delete up to 100 messages at a time.')
    }

    const msgs: Collection<string, Message> = await channelMessages.fetch({ limit: amount })

    for (const msg of msgs.values()) {
      if (msg.deletable) {
        await msg.delete()
      }
    }

    await interaction.reply(`Deleted ${amount} messages.`)
    await wait(5000) // wait 5 second
    await interaction.deleteReply()
  },
}
