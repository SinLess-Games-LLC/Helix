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
  findOne(id: number) {
    return from(this.userProfileRepository.findOne({ where: { id } }))
  }

  update(id: number, updateUserProfileDto: userProfile) {
    return from(this.userProfileRepository.update(id, updateUserProfileDto))
  }
}
