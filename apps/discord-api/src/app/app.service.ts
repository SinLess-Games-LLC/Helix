import { Injectable } from '@nestjs/common'

interface Uptime {
  raw: number
  formatted: string // Assuming formatUptime returns a string
}

interface MemoryMetrics {
  raw: NodeJS.MemoryUsage
  formatted: {
    rss: string
    heapTotal: string
    heapUsed: string
    external: string
    arrayBuffers: string
  }
}

interface Metrics {
  cpuUsage: NodeJS.CpuUsage
  memory: MemoryMetrics
}

export interface DiscordApiData {
  name: string
  description: string
  version: string
  status: string
  uptime: Uptime
  metrics: Metrics
}

@Injectable()
export class AppService {
  private formatMemory(bytes: number) {
    const kb = bytes / 1024
    const mb = kb / 1024
    const gb = mb / 1024

    if (gb > 1) {
      return `${gb.toFixed(2)} GB`
    } else if (mb > 1) {
      return `${mb.toFixed(2)} MB`
    } else if (kb > 1) {
      return `${kb.toFixed(2)} KB`
    } else {
      return `${bytes} Bytes`
    }
  }

  private formatUptime(ms: number) {
    // ms comes in as seconds
    const seconds = Math.floor(ms)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const formattedDays = days > 0 ? `${days} Days, ` : ''
    const formattedHours = hours > 0 ? `${hours} Hours, ` : ''
    const formattedMinutes = minutes > 0 ? `${minutes} Minutes, ` : ''
    const formattedSeconds = `${seconds} Seconds`

    return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`
  }

  getData() {
    return {
      name: 'Helix Discord API',
      description: 'This is a Discord API',
      version: '1.0.0',
      status: 'healthy',
      uptime: {
        raw: process.uptime(),
        formatted: this.formatUptime(process.uptime()),
      },
      metrics: {
        cpuUsage: process.cpuUsage(),
        memory: {
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
