import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm'
import { DiscordWeeklyStatistics } from './weeklyStats.entity'
import { BaseEntity } from '../../base.entity'

@Entity()
export class DiscordDailyStatistics extends BaseEntity {
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
}
