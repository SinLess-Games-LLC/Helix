import {
  Entity,
  Column,
} from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity()
export class Image extends BaseEntity {
  @Column({ type: 'text' })
  fileName: string

  @Column({ type: 'text' })
  basePath?: string

  @Column({ type: 'text' })
  url: string

  @Column({ type: 'int' })
  size: number

  @Column('simple-array')
  tags: string[]

  @Column({ type: 'text' })
  hash: string

  @Column({ type: 'text' })
  deleteHash: string
}
