import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

export interface UserSettingInterface {
  sid: number
  newsletter: boolean
  premium: boolean
  twoFactorAuthentication: boolean
  updatedAt: Date
  createdAt: Date
}

@Entity()
/**
 * @class UserSetting
 * @description UserSetting entity
 */
export class UserSetting extends BaseEntity {
  @Column({ type: 'boolean', default: false })
  newsletter: boolean

  @Column({ type: 'boolean', default: false })
  premium: boolean

  @Column({ type: 'boolean', default: false })
  twoFactorAuthentication: boolean
}
