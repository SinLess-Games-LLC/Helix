import { Test, TestingModule } from '@nestjs/testing'
import { AppService, Response } from './app.service'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('getStatus', () => {
    it('should return a valid health check response', async () => {
      const result: Response = await appService.getStatus()
      // Add assertions based on the expected structure of the health check response
      expect(result).toBeDefined()
      // Add more specific assertions based on the actual structure of the health check response
      expect(result.name).toEqual('Helix Health Check')
      // Add more assertions as needed
    })
  })

  // Add more test cases as needed

  afterEach(() => {
    // Add any cleanup logic if needed
  })
})
