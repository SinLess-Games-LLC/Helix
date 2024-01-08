import {
  Entity,
  Column,
} from 'typeorm'
import { BaseEntity } from '../base.entity'

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity()
export class Pastebin extends BaseEntity {
  @Column({ type: 'text' })
  editCode: string

  @Column({ type: 'int', default: -1 })
  lifetime: number
}
