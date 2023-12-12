import { Command, Handler } from '@discord-nestjs/core'
import {
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
  Message,
} from 'discord.js'
import { Injectable, Logger } from '@nestjs/common'
import { BotColors } from '../../bot.constants'
import { botColors } from '../../bot.types'
import { HelixConfiguration } from '@helix/helix-utilities'

@Command({
  name: 'bot-invite',
  description: 'display the bot invite link',
})
@Injectable()
export class BotInviteCommand {
  private readonly botColors: botColors
  private logger: Logger
  private config: HelixConfiguration

  constructor() {
    this.botColors = BotColors
    this.config = new HelixConfiguration()
    this.logger = new Logger(BotInviteCommand.name)
  }
  @Handler()
  onPing(message: Message) {
    this.logger.debug(`building embed...`)
    const em = new EmbedBuilder()
    em.setTitle('Bot Invite Link')
    em.setColor(this.botColors.bot.pink as ColorResolvable)
    em.setFields({
      name: 'Invite Link',
      value: this.config.discord.bot.invite_url,
      inline: true,
    })
    em.setImage(
      'https://cdn.discordapp.com/avatars/1143176646074052698/0a56c831ad30bf8297c6020106e4754f.png?size=4096&format=webp&width=1152&height=0'
    )
    message.channel.send({ embeds: [em] })
    return 'Sure, Here is the invite link for the bot.'
  }
}
