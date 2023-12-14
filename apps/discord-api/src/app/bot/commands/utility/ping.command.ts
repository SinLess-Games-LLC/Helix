import { Command, Handler } from '../../../discord'
import { ColorResolvable, EmbedBuilder, Message } from 'discord.js'
import { Injectable, Logger } from '@nestjs/common'
import { BotColors } from '../../bot.constants'
import { botColors } from '../../bot.types'

@Command({
  name: 'ping',
  description: 'gets the ping of the bot',
})
@Injectable()
export class PingCommand {
  private readonly botColors: botColors
  private logger: Logger
  constructor() {
    this.botColors = BotColors
    this.logger = new Logger(PingCommand.name)
  }
  @Handler()
  onPing(message: Message) {
    this.logger.debug(`building embed...`)
    const em = new EmbedBuilder()
    em.setTitle('Ping')
    em.setColor(this.botColors.bot.pink as ColorResolvable)
    em.setFields(
      { name: 'Bot Ping', value: `${message.client.ws.ping} ms`, inline: true },
      {
        name: 'API Ping',
        value: `${Date.now() - message.createdTimestamp} ms`,
        inline: true,
      },
      {
        name: 'Latency',
        value: `${Math.round(message.client.ws.ping)} ms`,
        inline: true,
      }
    )
    em.setImage(
      'https://www.netblazr.com/wp-content/uploads/2020/06/Low-latency-icon-300x288.png'
    )
    message.channel.send({ embeds: [em] })
    return 'here is the ping of the bot'
  }
}
