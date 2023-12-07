import { Module } from '@nestjs/common'
import { MicroserviceService } from './microservice.service'
import { MicroserviceController } from './microservice.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Microservice } from '@helix/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Microservice])],
  controllers: [MicroserviceController],
  providers: [MicroserviceService],
})
export class MicroserviceModule {}
