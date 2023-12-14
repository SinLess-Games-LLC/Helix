import axios from 'axios'
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

interface Status {
  apiStatus: string
  botStatus: string
  botClientStatus: string
}

export interface DiscordApiData {
  name: string
  description: string
  version: string
  overallHealth: string
  statuses: Status
  metrics: Metrics
}

describe('GET /api', () => {
  it('should return a message', async () => {
    // Assuming your Nest.js server is running on http://localhost:3000
    const res = await axios.get('http://localhost:3000/api')
    const data: DiscordApiData = res.data

    expect(res.status).toBe(200)
    // app
    expect(data).toHaveProperty('name', 'Helix Discord API')
    expect(data).toHaveProperty(
      'description',
      'This is the discord bot api for the Helix Discord Bot.'
    )
    expect(data).toHaveProperty('version', '1.0.0')

    // health
    expect(data).toHaveProperty('overallHealth')
    expect(data).toHaveProperty('statuses')
    expect(data.statuses).toHaveProperty('apiStatus')
    expect(data.statuses).toHaveProperty('botStatus')
    expect(data.statuses).toHaveProperty('botClientStatus')

    // metrics
    expect(data).toHaveProperty('metrics')
    expect(data.metrics).toHaveProperty('uptime')
    expect(data.metrics.uptime).toHaveProperty('raw')
    expect(data.metrics.uptime).toHaveProperty('formatted')
    expect(data.metrics).toHaveProperty('cpuUsage')
    expect(data.metrics).toHaveProperty('memory')
    expect(data.metrics.memory).toHaveProperty('raw')
    expect(data.metrics.memory).toHaveProperty('formatted')
  })
})
