import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DiscordApiData } from './app.types'
import { BotGateway } from './bot/bot.gateway'
import { DiscordModule } from '@discord-nestjs/core'
import { DiscordConfigService } from './bot/discord-config.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        DiscordModule.forRootAsync({
          useClass: DiscordConfigService,
        }),
      ],
      controllers: [AppController],
      providers: [AppService, BotGateway],
    }).compile()
  })

  describe('getData', () => {
    it('should return data with proper structure"', async () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.getData())
      const data = (await appController.getData()) as DiscordApiData
      expect(data).toHaveProperty('name', 'Helix Discord API')
      expect(data).toHaveProperty(
        'description',
        'This is the discord bot api for the Helix Discord Bot.'
      )
      expect(data).toHaveProperty('version', '1.0.0')
      expect(data).toHaveProperty('apiStatus')
      expect(data).toHaveProperty('botStatus')
      expect(data.metrics).toHaveProperty('uptime')
      expect(data.metrics.uptime).toHaveProperty('raw')
      expect(data.metrics.uptime).toHaveProperty('formatted')
      expect(data).toHaveProperty('metrics')
      expect(data.metrics).toHaveProperty('cpuUsage')
      expect(data.metrics).toHaveProperty('memory')
      expect(data.metrics.memory).toHaveProperty('raw')
      expect(data.metrics.memory).toHaveProperty('formatted')
    })
  })
})
