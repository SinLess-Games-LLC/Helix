import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DiscordWeeklyStatistics } from './weeklyStats.entity'

@Entity()
export class DiscordDailyStatistics {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  guildId: string | undefined

  @Column()
  kicks: number | undefined

  @Column()
  warnings: number | undefined

  @Column()
  bans: number | undefined

  @Column()
  channels: number | undefined

  @Column()
  emojis: number | undefined

  @Column()
  stickers: number | undefined

  @Column()
  members: number | undefined

  @Column()
  roles: number | undefined

  @Column()
  bots: number | undefined

  @ManyToOne(
    () => DiscordWeeklyStatistics,
    (weeklyStats) => weeklyStats.dailyStats
  )
  week: DiscordWeeklyStatistics | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
