import {
  Column,
  Entity,
  EntityRepository,
  Repository,
} from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity()
export class DiscordGuild extends BaseEntity {
  @Column()
  discord_id: string | undefined // snowflake	guild id

  @Column({ default: '' })
  name: string | undefined // string	guild name (2-100 characters, excluding trailing and leading whitespace)

  @Column()
  owner_id: number | undefined // snowflake	id of owner

  @Column()
  Channel_count: number | undefined // integer	total number of text channels and categories that the guild has

  @Column()
  thread_count: number | undefined // integer	total number of threads that the guild has across all of its channels

  @Column()
  member_count: number | undefined // integer	total number of users in the guild

  @Column({ nullable: true, type: 'string' })
  prefix: string | null | undefined // string	the prefix of the guild, used when invoking slash commands

  @Column()
  deleted: boolean = false

  @Column()
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
