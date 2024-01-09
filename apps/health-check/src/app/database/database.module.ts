import { Module } from '@nestjs/common'

import { DatabaseController } from './database.controller'
import { DatabaseService } from './database.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { entities } from '@helix/entities'

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
