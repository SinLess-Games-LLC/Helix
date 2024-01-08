import { BaseEntity } from '../base.entity'
import { Column, Entity } from 'typeorm'


@Entity()
export class Health extends BaseEntity {
  @Column()
  systemStatus: string

  @Column()
  systemVersion: string

  @Column()
  systemUptime: string

  @Column()
  systemCPU: string

  @Column()
  systemMemory: string

  @Column()
  latency: string

  @Column()
  day: Date
}
