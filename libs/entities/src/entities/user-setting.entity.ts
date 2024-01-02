import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export interface UserSettingInterface {
  id: number
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
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false })
  newsletter: boolean

  @Column({ type: 'boolean', default: false })
  premium: boolean

  @Column({ type: 'boolean', default: false })
  twoFactorAuthentication: boolean

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
