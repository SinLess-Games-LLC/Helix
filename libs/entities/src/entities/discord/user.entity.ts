import { Column, Entity, EntityRepository, Repository } from 'typeorm'
import { Snowflake } from 'discord-api-types/globals'
import { BaseEntity } from './base.entity'

// ===========================================
// ================= Entity ==================
// ===========================================
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

// ===========================================
// =========== Custom Repository =============
// ===========================================
@EntityRepository(DiscordUser)
export class UserRepository extends Repository<DiscordUser> {
  async updateLastInteract(userId?: number): Promise<void> {
    const id = userId?.toString()
    const user = await this.findOneBy({ discord_id: id })

    if (user) {
      user.lastInteract = new Date()
      await this.save(user)
    }
  }
}
