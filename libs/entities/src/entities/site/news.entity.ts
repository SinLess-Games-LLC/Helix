import { UserProfile } from '../user'
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm'
import slugify from 'slugify'
import { BaseEntity } from '../base.entity'

export interface NewsInterface {
  sid: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  slug: string
}

@Entity()
export class News extends BaseEntity {
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

  @BeforeInsert()
  slugify() {
    this.slug = slugify(this.name, '_')
    return this.slug
  }
}
