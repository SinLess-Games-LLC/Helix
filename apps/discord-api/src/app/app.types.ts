interface Uptime {
  raw: number
  formatted: string // Assuming formatUptime returns a string
}

interface MemoryMetrics {
  total: {
    raw: number
    formatted: string
  }
  raw: NodeJS.MemoryUsage
  formatted: {
    rss: string
    heapTotal: string
    heapUsed: string
    external: string
    arrayBuffers: string
  }
}

interface CpuUsage {
  raw: NodeJS.CpuUsage
  formatted: string
}

interface Metrics {
  uptime: Uptime
  cpuUsage: CpuUsage
  memory: MemoryMetrics
}

export interface DiscordApiData {
  name: string
  description: string
  version: string
  apiStatus: string
  botStatus: string
  metrics: Metrics
}
