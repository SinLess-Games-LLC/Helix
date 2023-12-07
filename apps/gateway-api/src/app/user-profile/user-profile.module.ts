import { Module } from '@nestjs/common'
import { UserProfileService } from './user-profile.service'
import { UserProfileController } from './user-profile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProfile } from '@helix/entities'

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
