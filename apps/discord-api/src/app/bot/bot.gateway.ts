/* bot.gateway.ts */

import { Injectable, Logger } from '@nestjs/common'
import { Once, InjectDiscordClient } from '@discord-nestjs/core'
import { Client } from 'discord.js'

@Injectable()
export class BotGateway {
  private botIsHealthy: boolean = false
  private readonly logger = new Logger(BotGateway.name)

  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  public setBotHealth(health: boolean) {
    this.logger.debug(`Setting botIsHealthy to ${health}...`)
    this.botIsHealthy = health
    this.logger.debug(`botIsHealthy set to ${this.botIsHealthy}.`)
    return this.botIsHealthy
  }

  public getBotHealth() {
    this.logger.debug(`Getting botIsHealthy...`)
    this.logger.debug(`botIsHealthy: ${this.botIsHealthy}`)
    return this.botIsHealthy
  }

  @Once('ready')
  onReady() {
    this.logger.debug('Setting bot health to true...')
    this.setBotHealth(true)
    this.logger.debug(`Bot health set to ${this.getBotHealth()}.`)
    this.logger.log(`🚀 🚀| Bot ${this.client.user.tag} was started! |🚀 🚀`)
  }
}
