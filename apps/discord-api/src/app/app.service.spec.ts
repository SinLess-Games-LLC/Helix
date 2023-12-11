import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from './app.service'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('getData', () => {
    it('should return data with proper structure', () => {
      const data = appService.getData()

      expect(data).toHaveProperty('name', 'Helix Discord API')
      expect(data).toHaveProperty('description', 'This is a Discord API')
      expect(data).toHaveProperty('version', '1.0.0')
      expect(data).toHaveProperty('status', 'healthy')
      expect(data).toHaveProperty('uptime')
      expect(data.uptime).toHaveProperty('raw')
      expect(data.uptime).toHaveProperty('formatted')
      expect(data).toHaveProperty('metrics')
      expect(data.metrics).toHaveProperty('cpuUsage')
      expect(data.metrics).toHaveProperty('memory')
      expect(data.metrics.memory).toHaveProperty('raw')
      expect(data.metrics.memory).toHaveProperty('formatted')
    })
  })
})
