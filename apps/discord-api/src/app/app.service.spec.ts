import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from './app.service'
import { BotGateway } from './bot/bot.gateway'
import { DiscordModule } from './discord'
import { DiscordConfigService } from './bot/discord-config.service'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DiscordModule.forRootAsync({
          useClass: DiscordConfigService,
        }),
      ],
      providers: [AppService, BotGateway],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('getData', () => {
    it('should return data with proper structure', async () => {
      const data = await appService.getData()

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
})
