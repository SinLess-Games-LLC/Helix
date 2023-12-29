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
  id: number | undefined

  @Column('int')
  week: number | undefined

  @OneToMany(() => DiscordDailyStatistics, dailyStats => dailyStats.week)
  dailyStats: DiscordDailyStatistics[] | undefined

  @ManyToOne(() => DiscordMonthlyStatistics, month => month.weeklyStats)
  month: DiscordMonthlyStatistics | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
