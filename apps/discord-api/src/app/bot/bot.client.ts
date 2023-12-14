import { Client, ClientOptions } from 'discord.js'
import { Logger } from '@nestjs/common'
import { BotColors, ErrCodes } from './bot.constants'
import {
  botColors,
  errCodes,
  MinimalStatusResponse,
  StatusResponse,
} from './bot.types'
import axios from 'axios'
import { Component } from './commands/utility/utility.types'

export class HelixClient extends Client {
  private readonly logger = new Logger(HelixClient.name)
  private isClientHealthy: boolean = false
  private isDiscordHealthy: boolean = false
  private isCloudflareHealthy: boolean = false
  public BotColors: botColors = BotColors
  public ErrorCodes: errCodes = ErrCodes

  private _discordHealthStatusUrl: string =
    'https://discordstatus.com/api/v2/status.json'
  private _discordHealthSummaryUrl: string =
    'https://discordstatus.com/api/v2/summary.json'
  private _cloudflareHealthStatusUrl: string =
    'https://www.cloudflarestatus.com/api/v2/status.json'
  private _cloudflareHealthSummaryUrl: string =
    'https://www.cloudflarestatus.com/api/v2/summary.json'

  constructor(options: ClientOptions) {
    super(options)
    this.setClientHealth()
    this.setDiscordHealth().then()
    this.setCloudflareHealth().then()
  }

  private setClientHealth() {
    this.isClientHealthy = true
    this.logger.debug(`clientIsHealthy set to ${this.isClientHealthy}.`)
  }

  public getClientHealth() {
    this.logger.log(`Getting isClientHealthy...`)
    this.logger.debug(`isClientHealthy: ${this.isClientHealthy}`)
    return this.isClientHealthy
  }

  public getDiscordHealth() {
    this.logger.log(`Getting isDiscordHealthy...`)
    this.logger.debug(`isDiscordHealthy: ${this.isDiscordHealthy}`)
    return this.isDiscordHealthy
  }

  private async setDiscordHealth() {
    this.logger.debug(`Setting discordIsHealthy...`)
    const res1 = await axios.get(this._discordHealthStatusUrl)
    const res2 = await axios.get(this._discordHealthSummaryUrl)
    const data1: MinimalStatusResponse = res1.data
    const data2: StatusResponse = res2.data
    const services: Component[] = data2.components
    // this.logger.debug(`services: ${JSON.stringify(services)}`)

    if (data1.status.description !== 'All Systems Operational') {
      for (const service of services) {
        // API
        if (service.name === 'API') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Api is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord API is down. Error: ${this.ErrorCodes.System.discord.API_DOWN}`
            )
          }
        }
        // Gateway
        if (service.name === 'Gateway') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Gateway is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Gateway is down. Error: ${this.ErrorCodes.System.discord.GATEWAY_DOWN}`
            )
          }
        }
        // Media Proxy
        if (service.name === 'Media Proxy') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Media Proxy is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Media Proxy is down. Error: ${this.ErrorCodes.System.discord.MEDIA_PROXY_DOWN}`
            )
          }
        }
        // Push Notifications
        if (service.name === 'Push Notifications') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Push Notifications is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Push Notifications is down. Error: ${this.ErrorCodes.System.discord.PUSH_NOTIFICATIONS_DOWN}`
            )
          }
        }
        // Voice
        if (service.name === 'Voice') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Voice is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Voice is down. Error: ${this.ErrorCodes.System.discord.VOICE_DOWN}`
            )
          }
        }
        // Third Party
        if (service.name === 'Third Party') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Third Party is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Third Party is down. Error: ${this.ErrorCodes.System.discord.THIRD_PARTY_DOWN}`
            )
          }
        }
        // Payments
        if (service.name === 'Payments') {
          if (service.status === 'operational') {
            this.isDiscordHealthy = true
            this.logger.debug(
              `Discord Payments is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
            )
          } else {
            this.isDiscordHealthy = false
            this.logger.debug(
              `discordIsHealthy set to ${this.isDiscordHealthy}.`
            )
            this.logger.error(
              `Discord Payments is down. Error: ${this.ErrorCodes.System.discord.PAYMENTS_DOWN}`
            )
          }
        }
      }
      return this.isDiscordHealthy
    }

    if (data1.status.description === 'All Systems Operational') {
      this.isDiscordHealthy = true
      this.logger.debug(
        `Discord is healthy. isDiscordHealthy set to ${this.isDiscordHealthy}.`
      )
      return this.isDiscordHealthy
    }
  }

  public getCloudflareHealth() {
    this.logger.log(`Getting isCloudflareHealthy...`)
    this.logger.debug(`isCloudflareHealthy: ${this.isCloudflareHealthy}`)
    return this.isCloudflareHealthy
  }

  private async setCloudflareHealth() {
    this.logger.debug(`Setting cloudflareIsHealthy...`)
    const res1 = await axios.get(this._cloudflareHealthStatusUrl)
    const res2 = await axios.get(this._cloudflareHealthSummaryUrl)
    const data1: MinimalStatusResponse = res1.data
    const data2: StatusResponse = res2.data
    const services: Component[] = data2.components
    // this.logger.debug(`services: ${JSON.stringify(services)}`)

    if (data1.status.description !== 'All Systems Operational') {
      for (const service of services) {
        // API
        if (service.name === 'API') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Api is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare API is down. Error: ${this.ErrorCodes.System.cloudflare.API_DOWN}`
            )
          }
        }
        // API Shield
        if (service.name === 'API Shield') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare API Shield is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare API Shield is down. Error: ${this.ErrorCodes.System.cloudflare.API_SHIELD_DOWN}`
            )
          }
        }
        // Always Online
        if (service.name === 'Always Online') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Always Online is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Always Online is down. Error: ${this.ErrorCodes.System.cloudflare.ALWAYS_ONLINE_DOWN}`
            )
          }
        }
        // Analytics
        if (service.name === 'Analytics') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Analytics is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Analytics is down. Error: ${this.ErrorCodes.System.cloudflare.ANALYTICS_DOWN}`
            )
          }
        }
        // Dashboard
        if (service.name === 'Dashboard') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Dashboard is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Dashboard is down. Error: ${this.ErrorCodes.System.cloudflare.DASHBOARD_DOWN}`
            )
          }
        }
        // Developers
        if (service.name === "Developer's Site") {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Developers is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Developers is down. Error: ${this.ErrorCodes.System.cloudflare.DEVELOPERS_DOWN}`
            )
          }
        }
        // Authoritative DNS
        if (service.name === 'Authoritative DNS') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Authoritative DNS is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Authoritative DNS is down. Error: ${this.ErrorCodes.System.cloudflare.AUTHORITATIVE_DNS_DOWN}`
            )
          }
        }
        // DNS Root Servers
        if (service.name === 'DNS Root Servers') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare DNS Root Servers is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare DNS Root Servers is down. Error: ${this.ErrorCodes.System.cloudflare.DNS_ROOT_SERVERS_DOWN}`
            )
          }
        }
        // DNS Updates
        if (service.name === 'DNS Updates') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare DNS Updates is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare DNS Updates is down. Error: ${this.ErrorCodes.System.cloudflare.DNS_UPDATES_DOWN}`
            )
          }
        }
        // Recursive DNS
        if (service.name === 'Recursive DNS') {
          if (service.status === 'operational') {
            this.isCloudflareHealthy = true
            this.logger.log(
              `Cloudflare Recursive DNS is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
            )
          } else {
            this.isCloudflareHealthy = false
            this.logger.debug(
              `cloudflareIsHealthy set to ${this.isCloudflareHealthy}.`
            )
            this.logger.error(
              `Cloudflare Recursive DNS is down. Error: ${this.ErrorCodes.System.cloudflare.RECURSIVE_DNS_DOWN}`
            )
          }
        }
      }
    }

    if (data1.status.description === 'All Systems Operational') {
      this.isCloudflareHealthy = true
      this.logger.debug(
        `Cloudflare is healthy. isCloudflareHealthy set to ${this.isCloudflareHealthy}.`
      )
    }
  }
}
