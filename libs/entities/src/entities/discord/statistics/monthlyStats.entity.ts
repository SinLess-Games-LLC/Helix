import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { DiscordWeeklyStatistics } from './weeklyStats.entity'
import { DiscordYearlyStatistics } from './yearlyStats.entity'
import { BaseEntity } from '../../base.entity'

@Entity()
export class DiscordMonthlyStatistics extends BaseEntity {
  @Column('int')
  month: number

  @OneToMany(() => DiscordWeeklyStatistics, weeklyStats => weeklyStats.month)
  weeklyStats: DiscordWeeklyStatistics

  @ManyToOne(() => DiscordYearlyStatistics, year => year.month)
  year: DiscordYearlyStatistics
}
