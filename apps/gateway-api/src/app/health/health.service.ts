import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  async fetchDatabaseHealth(): Promise<string> {
    return fetch('http://localhost:8000/api/v1/health/database/status')
      .then(response => response.json())
      .then(json => json.database)
  }
  async getHealth() {
    return {
      database: await this.fetchDatabaseHealth(),
    }
  }
}
