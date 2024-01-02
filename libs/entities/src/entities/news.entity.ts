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
  id: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  slug: string
}

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  content: string

  @Column('text')
  image: string

  @Column('text')
  alt: string

  @Column('text')
  slug: string

  @ManyToOne(() => UserProfile, userProfile => userProfile.news_added, {
    cascade: true,
  })
  added_by: number

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

  @BeforeInsert()
  slugify() {
    this.slug = slugify(this.name, '_')
    return this.slug
  }
}
