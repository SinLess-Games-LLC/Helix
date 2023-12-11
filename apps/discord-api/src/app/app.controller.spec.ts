import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'
import { AppService, DiscordApiData } from './app.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.getData() as DiscordApiData)
      expect(appController.getData()).toHaveProperty(
        'name',
        'Helix Discord API'
      )
      expect(appController.getData()).toHaveProperty(
        'description',
        'This is a Discord API'
      )
      expect(appController.getData()).toHaveProperty('version', '1.0.0')
      expect(appController.getData()).toHaveProperty('status', 'healthy')
      expect(appController.getData()).toHaveProperty('uptime')
      expect(appController.getData().uptime).toHaveProperty('raw')
      expect(appController.getData().uptime).toHaveProperty('formatted')
      expect(appController.getData()).toHaveProperty('metrics')
      expect(appController.getData().metrics).toHaveProperty('cpuUsage')
      expect(appController.getData().metrics).toHaveProperty('memory')
      expect(appController.getData().metrics.memory).toHaveProperty('raw')
      expect(appController.getData().metrics.memory).toHaveProperty('formatted')
    })
  })
})
