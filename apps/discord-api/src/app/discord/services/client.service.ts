import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common'
import { WebhookClient, WebhookClientData } from 'discord.js'

import { SetupClientFactory } from '../definitions/interfaces/discord-module-async-options'
import { DiscordModuleOption } from '../definitions/interfaces/discord-module-options'
import { OptionService } from './option.service'
import { HelixClient } from '../../bot/bot.client'

@Injectable()
export class ClientService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(ClientService.name)
  private webhookClient: WebhookClient
  private client: HelixClient

  constructor(private discordOptionService: OptionService) {}

  initClient(options: DiscordModuleOption): void {
    this.discordOptionService.updateOptions(options)

    const { token, webhook, discordClientOptions } =
      this.discordOptionService.getClientData()

    this.client = new HelixClient(discordClientOptions)
    this.client.token = token
    this.webhookClient = this.createWebhookClient(webhook)
  }

  getClient(): HelixClient {
    return this.client
  }

  async setupClient(setupFunction?: SetupClientFactory): Promise<void> {
    if (!setupFunction) return

    await setupFunction(this.client)
  }

  getWebhookClient(): WebhookClient {
    return this.webhookClient
  }

  async onApplicationBootstrap(): Promise<void> {
    const { autoLogin, failOnLogin } = this.discordOptionService.getClientData()

    if (!autoLogin) return

    try {
      await this.client.login()
    } catch (error) {
      this.logger.error('Failed to connect to Discord API')
      this.logger.error(error)

      if (failOnLogin) throw error
    }
  }

  onApplicationShutdown(): void {
    const { shutdownOnAppDestroy } = this.discordOptionService.getClientData()

    if (shutdownOnAppDestroy) this.client.destroy()
  }

  private createWebhookClient(
    webhookOptions: WebhookClientData
  ): WebhookClient {
    if (!webhookOptions) return

    return new WebhookClient(webhookOptions)
  }
}
