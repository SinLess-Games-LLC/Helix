import express from 'express'

export const RootRouter = express.Router()

function getUptime() {
  const uptime = process.uptime()
  const days = Math.floor(uptime / 86400)
  const hours = Math.floor(uptime / 3600) % 24
  const minutes = Math.floor(uptime / 60) % 60
  const seconds = Math.floor(uptime % 60)
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
}

function getCpuUsagePercentage(): number {
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

function formatMemory(bytes: number) {
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

function formatTotalMemory(memoryUsage: NodeJS.MemoryUsage) {
  return (
    memoryUsage.rss +
    memoryUsage.heapTotal +
    memoryUsage.external +
    memoryUsage.arrayBuffers +
    memoryUsage.heapUsed
  )
}

RootRouter.get('/', (req, res) => {
  res.send({
    name: 'Helix Discord API',
    description: 'This is the discord bot api for the Helix Discord Bot.',
    version: '1.0.0',
    metrics: {
      uptime: {
        raw: process.uptime(),
        formatted: `${getUptime()}`,
      },
      cpuUsage: {
        raw: process.cpuUsage(),
        formatted: `${getCpuUsagePercentage().toFixed(2)}%`,
      },
      memory: {
        total: {
          raw: formatTotalMemory(process.memoryUsage()),
          formatted: formatMemory(formatTotalMemory(process.memoryUsage())),
        },
        raw: process.memoryUsage(),
        formatted: {
          rss: formatMemory(process.memoryUsage().rss),
          heapTotal: formatMemory(process.memoryUsage().heapTotal),
          heapUsed: formatMemory(process.memoryUsage().heapUsed),
          external: formatMemory(process.memoryUsage().external),
          arrayBuffers: formatMemory(process.memoryUsage().arrayBuffers),
        },
      },
    },
  })
})
