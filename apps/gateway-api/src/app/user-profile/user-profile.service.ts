import { Injectable } from '@nestjs/common'
import { UserProfile as userProfile } from './user-profile.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProfile } from '@helix/entities'
import { Repository } from 'typeorm'
import { from } from 'rxjs'

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>
  ) {}
  findOne(sid: number) {
    return from(this.userProfileRepository.findOne({ where: { sid } }))
  }

  update(sid: number, updateUserProfileDto: userProfile) {
    return from(this.userProfileRepository.update(sid, updateUserProfileDto))
  }
}
