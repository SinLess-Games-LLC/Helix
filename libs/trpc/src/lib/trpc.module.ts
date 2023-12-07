import { Module } from '@nestjs/common'
import { TrpcService } from './trpc.service'

@Module({
  imports: [],
  providers: [TrpcService],
})
export class TrpcModule {}
