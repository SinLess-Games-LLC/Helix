import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class DiscordGuild {
  @PrimaryGeneratedColumn()
  id: number | undefined

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

  @UpdateDateColumn()
  updated_at: Date | undefined

  @CreateDateColumn()
  created_at: Date | undefined
}
