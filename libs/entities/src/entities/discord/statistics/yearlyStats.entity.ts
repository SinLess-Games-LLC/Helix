import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DiscordMonthlyStatistics } from './monthlyStats.entity'

@Entity()
export class DiscordYearlyStatistics {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  year: number

  @ManyToOne(() => DiscordMonthlyStatistics, monthly => monthly.year)
  month: DiscordMonthlyStatistics

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
