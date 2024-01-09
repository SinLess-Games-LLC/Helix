import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller()
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('/health')
  async getHealth() {
    return await this.healthService.getHealth()
  }
}
