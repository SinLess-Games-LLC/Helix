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
  id: number | undefined

  @Column('int')
  year: number | undefined

  @ManyToOne(() => DiscordMonthlyStatistics, monthly => monthly.year)
  month: DiscordMonthlyStatistics | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined
}
