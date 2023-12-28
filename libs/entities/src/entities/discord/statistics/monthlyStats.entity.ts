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
  id: number | undefined

  @Column()
  month: number | undefined

  @OneToMany(() => DiscordWeeklyStatistics, weeklyStats => weeklyStats.month)
  weeklyStats: DiscordWeeklyStatistics | undefined

  @ManyToOne(() => DiscordYearlyStatistics, year => year.month)
  year: DiscordYearlyStatistics | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
