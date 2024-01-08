import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm'
import { TechCategory } from '../../enums'
import { UserProfile } from '../user'
import slugify from 'slugify'
import { BaseEntity } from '../base.entity'

export interface TechnologyInterface {
  sid: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  category1: TechCategory
  category2: TechCategory
  website: string
  slug: string
  added_by: number
  updatedAt: Date
  createdAt: Date
}

@Entity()
/**
 * @class Technology
 * @description
 * A technology is a tool, framework, programming language, or other software used to develop a microservice.
 *
 * This includes but is not limited to:
 * - Programming Languages
 * - Frameworks
 * - Libraries
 * - Databases
 * - Operating Systems
 * - Cloud Providers
 * - etc.
 */
export class Technology extends BaseEntity {
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

  @Column({
    type: 'enum',
    enum: TechCategory,
    default: TechCategory.Other,
  })
  category1: TechCategory

  @Column({
    type: 'enum',
    enum: TechCategory,
    default: TechCategory.Other,
  })
  category2: TechCategory

  @Column('text')
  website: string

  @Column('text')
  slug: string

  @ManyToOne(() => UserProfile, user => user.technologies_added, {
    cascade: true,
  })
  added_by: number

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, '_')
    return this.slug
  }
}
