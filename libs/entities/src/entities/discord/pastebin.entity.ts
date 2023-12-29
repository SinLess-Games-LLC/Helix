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
  id: string | undefined

  @Column({ type: 'text' })
  editCode: string | undefined

  @Column({ type: 'int', default: -1 })
  lifetime: number | undefined

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | undefined
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

@EntityRepository(Pastebin)
export class PastebinRepository extends Repository<Pastebin> {}
