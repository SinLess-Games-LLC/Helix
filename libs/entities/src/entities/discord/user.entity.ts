import { Column, Entity, EntityRepository, Repository } from 'typeorm'
import { Snowflake } from 'discord-api-types/globals'
import { BaseEntity } from './base.entity'

// ===========================================
// ================= Entity ==================
// ===========================================
@Entity()
export class DiscordUser extends BaseEntity {
  @Column({ unique: true, type: 'bigint', generated: 'increment' })
  discord_id: Snowflake | undefined

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastInteract: Date | undefined
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
