import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, Response } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getStatus', () => {
    it('should return the status from AppService', async () => {
      const mockStatus: Response = {
        id: 'health-check',
        name: 'Helix Health Check',
        time: {
          raw: Date.now(),
          formatted: 'mock-formatted-date',
        },
        status: 'mock-status',
        components: [
          {
            id: 'mock-component',
            priority: 1,
            name: 'Mock Component',
            status: 'mock-component-status',
            position: 1,
          },
        ],
      };

      jest.spyOn(appService, 'getStatus').mockResolvedValue(mockStatus);

      const result = await appController.getStatus();

      expect(result).toEqual(mockStatus);
    });
  });

  // Add more test cases as needed

  afterEach(() => {
    // Add any cleanup logic if needed
  });
});
