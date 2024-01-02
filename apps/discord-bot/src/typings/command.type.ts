import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { CommandGroup } from '../enums/command.group.enum'

export type CommandType = {
  data: SlashCommandBuilder
  group: CommandGroup
  execute(interaction: CommandInteraction): void
}
