/* bot.gateway.ts */

import { Injectable, Logger } from '@nestjs/common'
import { Once, InjectDiscordClient, On } from '../discord'
import { Guild } from 'discord.js'
import { HelixClient } from './bot.client'

@Injectable()
export class BotGateway {
  private isBotHealthy: boolean = false
  private readonly logger = new Logger(BotGateway.name)

  constructor(
    @InjectDiscordClient()
    private readonly client: HelixClient
  ) {}

  public setBotHealth(health: boolean) {
    this.logger.debug(`Setting isBotHealthy to ${health}...`)
    this.isBotHealthy = health
    this.logger.debug(`isBotHealthy set to ${this.isBotHealthy}.`)
    return this.isBotHealthy
  }

  public getBotHealth() {
    this.logger.log(`Getting isBotHealthy...`)
    this.logger.debug(`isBotHealthy: ${this.isBotHealthy}`)
    return this.isBotHealthy
  }

  @Once('ready')
  onReady() {
    try {
      // Ensure that the client is defined and the setClientHealth method exists
      if (this.client) {
        this.setBotHealth(true)
        this.logger.debug(`Bot health set to ${this.getBotHealth()}.`)
        this.logger.debug(
          `Client health set to ${this.client.getClientHealth()}.`
        )
      } else {
        this.logger.error('Client or setClientHealth method is not available.')
      }
    } catch (err) {
      this.logger.error('There was an error that occurred: ' + err)
    }

    this.logger.log(`🚀 🚀| Bot ${this.client.user.tag} was started! |🚀 🚀`)
  }

  @Once('messageCreate')
  onMessageCreate() {}

  @On('guildCreate')
  async onGuildCreate(guild: Guild) {
    this.logger.log(`Joined guild ${guild.name}`)
  }
}
