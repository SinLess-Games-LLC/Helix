import { Column, Entity, EntityRepository, Repository } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity()
export class DiscordGuild extends BaseEntity {
  @Column({ type: 'text' })
  discord_id: string // snowflake	guild id

  @Column({ type: 'text' })
  name: string // string	guild name (2-100 characters, excluding trailing and leading whitespace)

  @Column({ type: 'bigint' })
  owner_id: number // snowflake	id of owner

  @Column({ type: 'int' })
  Channel_count: number // integer	total number of text channels and categories that the guild has

  @Column({ type: 'int' })
  thread_count: number // integer	total number of threads that the guild has across all of its channels

  @Column({ type: 'int' })
  member_count: number // integer	total number of users in the guild

  @Column({ nullable: true, type: 'text' })
  prefix: string | null // string	the prefix of the guild, used when invoking slash commands

  @Column({ type: 'boolean' })
  deleted: boolean = false

  @Column({ type: 'timestamp' })
  lastInteract: Date = new Date()
}

@EntityRepository(DiscordGuild)
export class DiscordGuildRepository extends Repository<DiscordGuild> {
  async updateLastInteract(guildId?: string): Promise<void> {
    const guild = await this.findOne({ where: { discord_id: guildId } })

    if (guild) {
      guild.lastInteract = new Date()
      await this.save(guild)
    }
  }

  async getActiveGuilds(): Promise<DiscordGuild[]> {
    return this.find({ where: { deleted: false } })
  }
}
