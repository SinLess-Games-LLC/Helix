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

  @Column('int')
  guildId: number | undefined

  @Column('int')
  kicks: number | undefined

  @Column('int')
  warnings: number | undefined

  @Column('int')
  bans: number | undefined

  @Column('int')
  channels: number | undefined

  @Column('int')
  emojis: number | undefined

  @Column('int')
  stickers: number | undefined

  @Column('int')
  members: number | undefined

  @Column('int')
  roles: number | undefined

  @Column('int')
  bots: number | undefined

  @ManyToOne(() => DiscordWeeklyStatistics, weeklyStats => weeklyStats.dailyStats)
  week: DiscordWeeklyStatistics | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
