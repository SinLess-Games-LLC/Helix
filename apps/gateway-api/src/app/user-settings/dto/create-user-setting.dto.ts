import { PartialType } from '@nestjs/mapped-types'
import { UserSetting } from '@helix/entities'

export class CreateUserSettingDto extends PartialType(UserSetting) {
  newsletter: boolean

  premium: boolean

  twoFactorAuthentication: boolean
}
