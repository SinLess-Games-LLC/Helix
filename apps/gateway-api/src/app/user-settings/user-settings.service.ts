import { Injectable } from '@nestjs/common'
import { UpdateUserSettingDto } from './dto/update-user-setting.dto'
import { from } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserSetting } from '@helix/entities'

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>
  ) {}
  findOne(sid: number) {
    return from(this.userSettingRepository.findOne({ where: { sid } }))
  }

  update(sid: number, updateUserSettingDto: UpdateUserSettingDto) {
    return from(this.userSettingRepository.update({ sid }, updateUserSettingDto))
  }
}
