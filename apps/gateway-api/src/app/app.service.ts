import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getUptime() {
    const uptime = process.uptime()
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor(uptime / 3600) % 24
    const minutes = Math.floor(uptime / 60) % 60
    const seconds = Math.floor(uptime % 60)
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
  }

  getCpuUsagePercentage(): number {
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
      endCpuUsage.user - startCpuUsage.user + (endCpuUsage.system - startCpuUsage.system)
    const elapsedRealTime = (endTime[0] - startTime[0]) * 1e9 + (endTime[1] - startTime[1])

    return (elapsedCpuTime / elapsedRealTime) * 100
  }

  formatMemory(bytes: number) {
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

  formatTotalMemory(memoryUsage: NodeJS.MemoryUsage) {
    return (
      memoryUsage.rss +
      memoryUsage.heapTotal +
      memoryUsage.external +
      memoryUsage.arrayBuffers +
      memoryUsage.heapUsed
    )
  }
  getStatus() {
    return {
      name: 'Helix Gateway API',
      description: 'The Helix Gateway API is the gateway to the Helix ecosystem.',
      version: '1.0.0',
      metrics: {
        uptime: {
          raw: process.uptime(),
          formatted: `${this.getUptime()}`,
        },
        cpuUsage: {
          raw: process.cpuUsage(),
          formatted: `${this.getCpuUsagePercentage().toFixed(2)}%`,
        },
        memory: {
          total: {
            raw: this.formatTotalMemory(process.memoryUsage()),
            formatted: this.formatMemory(this.formatTotalMemory(process.memoryUsage())),
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
