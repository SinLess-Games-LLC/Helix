import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ValueTransformer } from 'typeorm'
import { User } from './user.entity'

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

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'uuid' })
  userId!: string

  @Column({ type: 'text' })
  type!: string

  @Column({ type: 'text' })
  provider!: string

  @Column({ type: 'text' })
  providerAccountId!: string

  @Column({ type: 'varchar', nullable: true })
  refresh_token!: string | null

  @Column({ type: 'varchar', nullable: true })
  access_token!: string | null

  @Column({
    nullable: true,
    type: 'bigint',
    transformer: transformer.bigint,
  })
  expires_at!: number | null

  @Column({ type: 'varchar', nullable: true })
  token_type!: string | null

  @Column({ type: 'varchar', nullable: true })
  scope!: string | null

  @Column({ type: 'varchar', nullable: true })
  id_token!: string | null

  @Column({ type: 'varchar', nullable: true })
  session_state!: string | null

  @Column({ type: 'varchar', nullable: true })
  oauth_token_secret!: string | null

  @Column({ type: 'varchar', nullable: true })
  oauth_token!: string | null

  @ManyToOne(() => User, user => user.accounts, {
    createForeignKeyConstraints: true,
  })
  user!: User
}
