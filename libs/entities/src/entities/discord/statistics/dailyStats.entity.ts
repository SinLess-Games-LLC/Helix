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
  id: number

  @Column('int')
  guildId: number

  @Column('int')
  kicks: number

  @Column('int')
  warnings: number

  @Column('int')
  bans: number

  @Column('int')
  channels: number

  @Column('int')
  emojis: number

  @Column('int')
  stickers: number

  @Column('int')
  members: number

  @Column('int')
  roles: number

  @Column('int')
  bots: number

  @ManyToOne(() => DiscordWeeklyStatistics, weeklyStats => weeklyStats.dailyStats)
  week: DiscordWeeklyStatistics

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
