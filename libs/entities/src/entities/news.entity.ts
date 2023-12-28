import { UserProfile } from './user-profile.entity'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import slugify from 'slugify'

export interface NewsInterface {
  id: number | undefined
  name: string | undefined
  description: string | undefined
  content: string | undefined
  image: string | undefined
  alt: string | undefined
  slug: string | undefined
}

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  name: string | undefined

  @Column('text')
  description: string | undefined

  @Column('text')
  content: string | undefined

  @Column()
  image: string | undefined

  @Column()
  alt: string | undefined

  @Column()
  slug: string | undefined

  @ManyToOne(() => UserProfile, userProfile => userProfile.news_added, {
    cascade: true,
  })
  added_by: number | undefined

  @UpdateDateColumn()
  updated_at: Date | undefined

  @CreateDateColumn()
  created_at: Date | undefined

  @BeforeInsert()
  slugify() {
    if (typeof this.name === 'string') {
      this.slug = slugify(this.name, '_')
    }
    return this.slug
  }
}
