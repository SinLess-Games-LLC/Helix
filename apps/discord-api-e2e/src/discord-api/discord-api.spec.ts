import axios from 'axios'

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

describe('GET /api', () => {
  it('should return a message', async () => {
    // Assuming your Nest.js server is running on http://localhost:3000
    const res = await axios.get('http://localhost:3000/api')

    expect(res.status).toBe(200)
    expect(res.data as DiscordApiData).toHaveProperty(
      'name',
      'Helix Discord API'
    )
    expect(res.data).toHaveProperty('description', 'This is a Discord API')
    expect(res.data).toHaveProperty('version', '1.0.0')
    expect(res.data).toHaveProperty('status', 'healthy')
    expect(res.data).toHaveProperty('uptime')
    expect(res.data.uptime).toHaveProperty('raw')
    expect(res.data.uptime).toHaveProperty('formatted')
    expect(res.data).toHaveProperty('metrics')
    expect(res.data.metrics).toHaveProperty('cpuUsage')
    expect(res.data.metrics).toHaveProperty('memory')
    expect(res.data.metrics.memory).toHaveProperty('raw')
    expect(res.data.metrics.memory).toHaveProperty('formatted')
    // Add more specific assertions for the structure of the uptime and metrics properties if needed
  })
})
