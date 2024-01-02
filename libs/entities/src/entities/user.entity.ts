import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm'
import { UserProfile, UserProfileInterface } from './user-profile.entity'
import { UserSetting, UserSettingInterface } from './user-setting.entity'
import { Role } from '../enums/roles.enum'
import { v4 as uuidv4 } from 'uuid'
import { Account } from './account.entity'
import { Session } from './session.entity'

const transformer: Record<'date' | 'bigint', ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
}

export interface UserInterface {
  id: number
  uuid: string
  name: string | null
  user_name: string
  email: string
  password: string
  role: Role
  profile_id: number
  profile: UserProfileInterface
  settings_id: number
  settings: UserSettingInterface
  updatedAt: Date
  createdAt: Date
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('uuid')
  uuid: string

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'varchar', nullable: true })
  user_name: string

  @Column('text')
  email: string

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified: string

  @Column({ type: 'varchar', nullable: true })
  image!: string

  @Column('text')
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role

  @Column({ type: 'int', nullable: true })
  profile_id: number

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: UserProfile

  @Column({ type: 'int', nullable: true })
  settings_id: number

  @OneToOne(() => UserSetting, { cascade: true, eager: true })
  @JoinColumn({ name: 'settings_id', referencedColumnName: 'id' })
  settings: UserSetting

  @OneToMany(() => Session, session => session.userId)
  sessions!: Session[]

  @OneToMany(() => Account, account => account.userId)
  accounts!: Account[]

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4()
  }
}
