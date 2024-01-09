import { Controller, Get } from '@nestjs/common'
import { DatabaseService } from './database.service'

@Controller()
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('/health/database/status')
  async getStatus() {
    return {
      database: await this.databaseService.checkDatabaseStatus(),
    }
  }
}
