import { Column, Entity } from 'typeorm'
import { Snowflake } from 'discord-api-types/globals'
import { BaseEntity } from '../base.entity'

@Entity()
export class DiscordUser extends BaseEntity {
  @Column({ unique: true, type: 'bigint' })
  discord_id: Snowflake

  @Column({ type: 'text' })
  username: string

  @Column({ type: 'text' })
  discriminator: string

  @Column({ type: 'int' })
  discord_account_age: number

  @Column({ type: 'int' })
  helix_account_age: number

  @Column({ type: 'boolean' })
  discord_verified: boolean

  @Column({ type: 'boolean' })
  helix_verified: boolean

  @Column({ type: 'text' })
  email: string

  @Column({ type: 'text' })
  system_warnings: number

  @Column({ type: 'text' })
  display_name: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastInteract: Date
}
