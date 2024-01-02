import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  EntityRepository,
  Repository,
} from 'typeorm'

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity()
export class Pastebin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  editCode: string

  @Column({ type: 'int', default: -1 })
  lifetime: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

@EntityRepository(Pastebin)
export class PastebinRepository extends Repository<Pastebin> {}
