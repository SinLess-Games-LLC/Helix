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
  id: number | undefined
  uuid: string | undefined
  name: string | null
  user_name: string | undefined
  email: string | undefined
  password: string | undefined
  role: Role | undefined
  profile_id: number | undefined
  profile: UserProfileInterface | undefined
  settings_id: number | undefined
  settings: UserSettingInterface | undefined
  updatedAt: Date | undefined
  createdAt: Date | undefined
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  uuid: string | undefined

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined

  @Column({ nullable: true })
  user_name: string | undefined

  @Column()
  email: string | undefined

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified: string | undefined

  @Column({ type: 'varchar', nullable: true })
  image!: string | null

  @Column()
  password: string | undefined

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role | undefined

  @Column({ nullable: true })
  profile_id: number | undefined

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: UserProfile | undefined

  @Column({ nullable: true })
  settings_id: number | undefined

  @OneToOne(() => UserSetting, { cascade: true, eager: true })
  @JoinColumn({ name: 'settings_id', referencedColumnName: 'id' })
  settings: UserSetting | undefined

  @OneToMany(() => Session, session => session.userId)
  sessions!: Session[]

  @OneToMany(() => Account, account => account.userId)
  accounts!: Account[]

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4()
  }
}
