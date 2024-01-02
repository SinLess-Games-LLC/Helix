import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  sid: number

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}
