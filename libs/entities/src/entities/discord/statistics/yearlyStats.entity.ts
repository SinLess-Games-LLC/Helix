import { Column, Entity, ManyToOne } from 'typeorm'
import { DiscordMonthlyStatistics } from './monthlyStats.entity'
import { BaseEntity } from '../../base.entity'

@Entity()
export class DiscordYearlyStatistics extends BaseEntity {
  @Column('int')
  year: number

  @ManyToOne(() => DiscordMonthlyStatistics, monthly => monthly.year)
  month: DiscordMonthlyStatistics
}
