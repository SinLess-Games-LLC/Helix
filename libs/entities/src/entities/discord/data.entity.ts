import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  EntityRepository,
  Repository,
} from 'typeorm'

/**
 * Default data for the DataEntity table (dynamic EAV key/value pattern)
 */
export const defaultData = {
  maintenance: false,
  lastMaintenance: Date.now(),
  lastStartup: Date.now(),
}

type DataType = keyof typeof defaultData

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity()
export class Data extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({ type: 'text', unique: true })
  key!: string

  @Column({ type: 'text' })
  value: string = ''
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

@EntityRepository(Data)
export class DataRepository extends Repository<Data> {
  async get<T extends DataType>(key: T): Promise<(typeof defaultData)[T] | undefined> {
    const data = await this.findOne({ where: { key } })

    return data ? JSON.parse(data.value) : undefined
  }

  async set<T extends DataType>(key: T, value: (typeof defaultData)[T]): Promise<void> {
    let data = await this.findOne({ where: { key } })

    if (!data) {
      data = new Data()
      data.key = key
    }

    data.value = JSON.stringify(value)
    await this.save(data)
  }

  async add<T extends DataType>(key: T, value: (typeof defaultData)[T]): Promise<void> {
    const data = new Data()
    data.key = key
    data.value = JSON.stringify(value)

    await this.save(data)
  }
}
