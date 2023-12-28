import { SlashCommandBuilder, Message } from 'discord.js'
import { CommandGroup } from '../../enums/command.group.enum'

module.exports = {
  group: CommandGroup.Utility,
  data: new SlashCommandBuilder().setName('connect').setDescription('Replies with Pong!'),
  async execute(message: Message) {
    await message.reply('Pong!')
  },
}
