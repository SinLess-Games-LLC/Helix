import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export interface UserSettingInterface {
  id: number | undefined
  newsletter: boolean | undefined
  premium: boolean | undefined
  twoFactorAuthentication: boolean | undefined
  updatedAt: Date | undefined
  createdAt: Date | undefined
}

@Entity()
/**
 * @class UserSetting
 * @description UserSetting entity
 */
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({ default: false })
  newsletter: boolean | undefined

  @Column({ default: false })
  premium: boolean | undefined

  @Column({ default: false })
  twoFactorAuthentication: boolean | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
