import { Command, Handler } from '@discord-nestjs/core'
import { ColorResolvable, EmbedBuilder, Message } from 'discord.js'
import { Injectable, Logger } from '@nestjs/common'
import { BotColors } from '../../bot.constants'
import { botColors } from '../../bot.types'
import axios from 'axios'
import { AppService } from '../../../app.service'
import { BotGateway } from '../../bot.gateway'

@Command({
  name: 'status',
  description: 'display the bot invite link',
})
@Injectable()
export class StatusCommand {
  private readonly botColors: botColors
  private logger: Logger

  constructor(
    private readonly appService: AppService,
    private readonly BotGateway: BotGateway
  ) {
    this.botColors = BotColors
    this.logger = new Logger(StatusCommand.name)
  }

  private async fetchDiscordApiStatus() {
    try {
      const response = await axios.get(
        'https://discordstatus.com/api/v2/status.json'
      )
      const summary = await response.data
      // this.logger.debug(summary)
      return summary.status.description
    } catch (err) {
      this.logger.error(`error fetching discord status: ${err}`)
      return 'error fetching discord status'
    }
  }

  @Handler()
  async onStatus(message: Message) {
    const discordStatus = await this.fetchDiscordApiStatus()
    const apiStatus = this.appService.getApiHealth()
    const botStatus = this.BotGateway.getBotHealth()
    this.logger.debug(`building Status embed...`)
    const em = new EmbedBuilder()
    // all good
    if (apiStatus && botStatus && discordStatus === 'All Systems Operational') {
      em.setTitle(`Status: Good`)
      em.setColor(this.botColors.system.success as ColorResolvable)
      em.setImage(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8A-tIXznrziTq0DhM0sc_9erRWPVtgX9KQ&usqp=CAU'
      )
    }
    // all bad
    if (
      !apiStatus &&
      !botStatus &&
      discordStatus !== 'All Systems Operational'
    ) {
      em.setTitle(`Status: Bad`)
      em.setColor(this.botColors.system.error as ColorResolvable)
      em.setImage(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6A6sW8CMKwU8DkcUkiikwgpIGjQsR-ewLww&usqp=CAU'
      )
    }
    // api good, bot good, discord bad
    if (apiStatus && botStatus && discordStatus !== 'All Systems Operational') {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }
    // api bad, bot bad, discord good
    if (
      !apiStatus &&
      !botStatus &&
      discordStatus === 'All Systems Operational'
    ) {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }
    // api bad, bot good, discord bad
    if (
      !apiStatus &&
      botStatus &&
      discordStatus !== 'All Systems Operational'
    ) {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }
    // api good, bot bad, discord bad
    if (
      apiStatus &&
      !botStatus &&
      discordStatus !== 'All Systems Operational'
    ) {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }
    // api good, bot bad, discord good
    if (
      apiStatus &&
      !botStatus &&
      discordStatus === 'All Systems Operational'
    ) {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }
    // api bad, bot good, discord good
    if (
      !apiStatus &&
      botStatus &&
      discordStatus === 'All Systems Operational'
    ) {
      em.setTitle(`Status: Degraded`)
      em.setColor(this.botColors.system.warning as ColorResolvable)
      em.setImage(
        'https://down-cvs-us.img.susercontent.com/ph-11134233-7r98w-llb00u4atw1eaa_tn.webp'
      )
    }

    em.setFields(
      { name: 'Discord Status', value: `${discordStatus}`, inline: true },
      {
        name: 'Helix Bot API Status',
        value: `${apiStatus ? 'healthy' : 'unhealthy'}`,
        inline: true,
      },
      {
        name: 'Helix Bot Status',
        value: `${botStatus ? 'healthy' : 'unhealthy'}`,
        inline: true,
      },
      {
        name: 'Uptime',
        value: `${await this.appService.getUptime()}`,
        inline: true,
      },
      {
        name: 'Memory Usage',
        value: `${this.appService.formatMemory(
          this.appService.formatTotalMemory(process.memoryUsage())
        )}`,
        inline: true,
      },
      {
        name: 'CPU Usage',
        value: `${this.appService.getCpuUsagePercentage().toFixed(2)}%`,
        inline: true,
      }
    )
    message.channel.send({ embeds: [em] })
    return 'Sure, Here is the status information of the bot.'
  }
}
