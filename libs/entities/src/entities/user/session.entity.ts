import { Entity, Column, ManyToOne, ValueTransformer } from 'typeorm'
import { User } from './user.entity'
import { BaseEntity } from '../base.entity'

const transformer: Record<'date' | 'bigint', ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
}

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ type: 'text' })
  sessionToken!: string

  @Column({ type: 'uuid' })
  userId!: string

  @Column({ type: 'text', transformer: transformer.date })
  expires!: string

  @ManyToOne(() => User, user => user.sessions)
  user!: User
}
