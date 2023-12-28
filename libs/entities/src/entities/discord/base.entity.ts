import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  sid: number | undefined

  @UpdateDateColumn()
  updated_at: Date | undefined

  @CreateDateColumn()
  created_at: Date | undefined
}
