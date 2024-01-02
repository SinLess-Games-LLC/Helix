import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DiscordDailyStatistics } from './dailyStats.entity'
import { DiscordMonthlyStatistics } from './monthlyStats.entity'

@Entity()
export class DiscordWeeklyStatistics {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  week: number

  @OneToMany(() => DiscordDailyStatistics, dailyStats => dailyStats.week)
  dailyStats: DiscordDailyStatistics[]

  @ManyToOne(() => DiscordMonthlyStatistics, month => month.weeklyStats)
  month: DiscordMonthlyStatistics

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
