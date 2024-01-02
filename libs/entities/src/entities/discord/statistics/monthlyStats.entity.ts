import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DiscordWeeklyStatistics } from './weeklyStats.entity'
import { DiscordYearlyStatistics } from './yearlyStats.entity'

@Entity()
export class DiscordMonthlyStatistics {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  month: number

  @OneToMany(() => DiscordWeeklyStatistics, weeklyStats => weeklyStats.month)
  weeklyStats: DiscordWeeklyStatistics

  @ManyToOne(() => DiscordYearlyStatistics, year => year.month)
  year: DiscordYearlyStatistics

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
