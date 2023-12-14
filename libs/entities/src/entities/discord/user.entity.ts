import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class DiscordUser {
  @PrimaryGeneratedColumn()
  sid: number | undefined

  @Column()
  id: number | undefined

  @Column()
  username: string | undefined

  @Column()
  discriminator: string | undefined

  @Column()
  discord_account_age: number | undefined

  @Column()
  helix_account_age: number | undefined

  @Column()
  discord_verified: boolean | undefined

  @Column()
  helix_verified: boolean | undefined

  @Column()
  email: string | undefined

  @Column()
  system_warnings: number | undefined

  @Column()
  display_name: string | undefined

  @UpdateDateColumn()
  updated_at: Date | undefined

  @CreateDateColumn()
  created_at: Date | undefined
}
