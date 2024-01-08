import { CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  sid: number

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}
