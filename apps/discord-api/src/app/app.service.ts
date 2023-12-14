import { Injectable, Logger } from '@nestjs/common'
import { DiscordApiData } from './app.types'
import { BotGateway } from './bot/bot.gateway'
import { InjectDiscordClient } from './discord'
import { HelixClient } from './bot/bot.client'

@Injectable()
export class AppService {
  public isApiHealthy: boolean = true
  private logger: Logger

  constructor(
    @InjectDiscordClient()
    private readonly client: HelixClient,
    private readonly botGateway: BotGateway
  ) {
    this.logger = new Logger('AppService')
  }

  public formatMemory(bytes: number) {
    // this.logger.debug(`Formatting Memory Usage...`)
    const kb = bytes / 1024
    const mb = kb / 1024
    const gb = mb / 1024

    if (gb > 1) {
      // this.logger.debug(`${gb.toFixed(2)} GB`)
      return `${gb.toFixed(2)} GB`
    } else if (mb > 1) {
      // this.logger.debug(`${mb.toFixed(2)} MB`)
      return `${mb.toFixed(2)} MB`
    } else if (kb > 1) {
      // this.logger.debug(`${kb.toFixed(2)} KB`)
      return `${kb.toFixed(2)} KB`
    } else {
      // this.logger.debug(`${bytes} Bytes`)
      return `${bytes} Bytes`
    }
  }

  public formatTotalMemory(memoryUsage: NodeJS.MemoryUsage) {
    return (
      memoryUsage.rss +
      memoryUsage.heapTotal +
      memoryUsage.external +
      memoryUsage.arrayBuffers +
      memoryUsage.heapUsed
    )
  }

  public async getUptime() {
    const uptime = process.uptime()
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor(uptime / 3600) % 24
    const minutes = Math.floor(uptime / 60) % 60
    const seconds = Math.floor(uptime % 60)
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
  }

  public setApiHealth(health: boolean) {
    this.logger.debug(`Setting isApiHealthy to ${health}...`)
    this.isApiHealthy = health
    this.logger.debug(`isApiHealthy set to ${this.isApiHealthy}.`)
    return this.isApiHealthy
  }

  public getApiHealth() {
    this.logger.log(`Getting isApiHealthy...`)
    this.logger.debug(`isApiHealthy: ${this.isApiHealthy}`)
    return this.isApiHealthy
  }

  public getCpuUsagePercentage(): number {
    const startTime = process.hrtime()
    const startCpuUsage = process.cpuUsage()

    // Some computation or delay to simulate a time interval
    // Replace this with your actual logic that takes time
    for (let i = 0; i < 1000000000; i++) {
      // Do some computation
    }

    const endTime = process.hrtime()
    const endCpuUsage = process.cpuUsage()

    const elapsedCpuTime =
      endCpuUsage.user -
      startCpuUsage.user +
      (endCpuUsage.system - startCpuUsage.system)
    const elapsedRealTime =
      (endTime[0] - startTime[0]) * 1e9 + (endTime[1] - startTime[1])

    return (elapsedCpuTime / elapsedRealTime) * 100
  }

  public getOverallHealth() {
    if (
      this.getApiHealth() &&
      this.botGateway.getBotHealth() &&
      this.client.getClientHealth()
    ) {
      return true
    }
    if (
      !this.getApiHealth() ||
      !this.botGateway.getBotHealth() ||
      !this.client.getClientHealth()
    ) {
      return false
    }
    if (
      this.getApiHealth() &&
      !this.botGateway.getBotHealth() &&
      !this.client.getClientHealth()
    ) {
      return false
    }
    if (
      !this.getApiHealth() &&
      this.botGateway.getBotHealth() &&
      !this.client.getClientHealth()
    ) {
      return false
    }
    if (
      !this.getApiHealth() &&
      !this.botGateway.getBotHealth() &&
      this.client.getClientHealth()
    ) {
      return false
    }
    if (
      this.getApiHealth() &&
      this.botGateway.getBotHealth() &&
      !this.client.getClientHealth()
    ) {
      return false
    }
    if (
      this.getApiHealth() &&
      !this.botGateway.getBotHealth() &&
      this.client.getClientHealth()
    ) {
      return false
    }
    if (
      !this.getApiHealth() &&
      this.botGateway.getBotHealth() &&
      this.client.getClientHealth()
    ) {
      return false
    }
  }

  public async getData(): Promise<DiscordApiData> {
    this.logger.debug('Getting data from /api ...')
    return {
      name: 'Helix Discord API',
      description: 'This is the discord bot api for the Helix Discord Bot.',
      version: '1.0.0',
      overallHealth: this.getOverallHealth() ? 'healthy' : 'unhealthy',
      statuses: {
        apiStatus: this.getApiHealth() ? 'healthy' : 'unhealthy',
        botStatus: this.botGateway.getBotHealth() ? 'healthy' : 'unhealthy',
        discordStatus: this.client.getDiscordHealth() ? 'healthy' : 'unhealthy',
        botClientStatus: this.client.getClientHealth()
          ? 'healthy'
          : 'unhealthy',
        cloudflareStatus: this.client.getCloudflareHealth()
          ? 'healthy'
          : 'unhealthy',
      },
      metrics: {
        uptime: {
          raw: process.uptime(),
          formatted: `${await this.getUptime()}`,
        },
        cpuUsage: {
          raw: process.cpuUsage(),
          formatted: `${this.getCpuUsagePercentage().toFixed(2)}%`,
        },
        memory: {
          total: {
            raw: this.formatTotalMemory(process.memoryUsage()),
            formatted: this.formatMemory(
              this.formatTotalMemory(process.memoryUsage())
            ),
          },
          raw: process.memoryUsage(),
          formatted: {
            rss: this.formatMemory(process.memoryUsage().rss),
            heapTotal: this.formatMemory(process.memoryUsage().heapTotal),
            heapUsed: this.formatMemory(process.memoryUsage().heapUsed),
            external: this.formatMemory(process.memoryUsage().external),
            arrayBuffers: this.formatMemory(process.memoryUsage().arrayBuffers),
          },
        },
      },
    }
  }
}
