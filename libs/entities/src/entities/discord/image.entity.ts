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
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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

// ===========================================
// =========== Custom Repository =============
// ===========================================

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async findByTags(tags: string[], explicit: boolean = true): Promise<Image[]> {
    const query = this.createQueryBuilder('image')

    for (const tag of tags) {
      query.andWhere(`:tag = ANY(image.tags)`, { tag })
    }

    const rows = await query.getMany()

    return explicit ? rows.filter(row => row.tags?.length === tags.length) : rows
  }
}
