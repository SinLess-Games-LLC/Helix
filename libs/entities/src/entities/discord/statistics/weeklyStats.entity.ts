import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { DiscordDailyStatistics } from './dailyStats.entity'
import { DiscordMonthlyStatistics } from './monthlyStats.entity'
import { BaseEntity } from '../../base.entity'

@Entity()
export class DiscordWeeklyStatistics extends BaseEntity {
  @Column('int')
  week: number

  @OneToMany(() => DiscordDailyStatistics, dailyStats => dailyStats.week)
  dailyStats: DiscordDailyStatistics[]

  @ManyToOne(() => DiscordMonthlyStatistics, month => month.weeklyStats)
  month: DiscordMonthlyStatistics
}
