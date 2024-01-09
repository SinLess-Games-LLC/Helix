// database.service.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Microservice } from '@helix/entities'

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Microservice)
    private readonly repository: Repository<Microservice>
  ) {}

  async checkDatabaseStatus(): Promise<string> {
    try {
      // Execute a simple query to check the database status
      await this.repository.query('SELECT 1')

      return 'Operational'
    } catch (error) {
      // If an error occurs, the database is unreachable
      return 'Unreachable'
    }
  }
}
