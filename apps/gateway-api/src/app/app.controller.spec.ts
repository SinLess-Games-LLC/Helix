import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let controller: AppController
  let service: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    controller = module.get<AppController>(AppController)
    service = module.get<AppService>(AppService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return status from AppService', () => {
    const statusMock = {
      name: 'Helix Gateway API',
      description: 'Your description here', // Add the missing properties
      version: '1.0.0',
      metrics: {
        uptime: {
          raw: 123456, // Replace with your actual raw value
          formatted: '1 day, 2 hours, 34 minutes, 56 seconds', // Replace with your actual formatted value
        },
        cpuUsage: {
          raw: { user: 123, system: 456 }, // Replace with your actual raw value
          formatted: '12.34%', // Replace with your actual formatted value
        },
        memory: {
          total: {
            raw: 789, // Replace with your actual raw value
            formatted: '789 KB', // Replace with your actual formatted value
          },
          raw: { rss: 123, heapTotal: 456, heapUsed: 789, external: 0, arrayBuffers: 0 }, // Replace with your actual raw value
          formatted: {
            rss: '123 KB', // Replace with your actual formatted value
            heapTotal: '456 KB', // Replace with your actual formatted value
            heapUsed: '789 KB', // Replace with your actual formatted value
            external: '0 Bytes', // Replace with your actual formatted value
            arrayBuffers: '0 Bytes', // Replace with your actual formatted value
          },
        },
      },
    }

    jest.spyOn(service, 'getStatus').mockReturnValue(statusMock)

    const result = controller.getStatus()

    expect(result).toBe(statusMock)
  })

  // Add more test cases as needed

  // Don't forget to clean up any resources, if necessary
  afterEach(() => {
    // Add cleanup logic here
  })
})
