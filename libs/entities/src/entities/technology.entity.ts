import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TechCategory } from '../enums/tech-category.enum'
import { UserProfile } from './user-profile.entity'
import slugify from 'slugify'

export interface TechnologyInterface {
  id: number | undefined
  name: string | undefined
  description: string | undefined
  content: string | undefined
  image: string | undefined
  alt: string | undefined
  category1: TechCategory | undefined
  category2: TechCategory | undefined
  website: string | undefined
  slug: string | undefined
  added_by: number | undefined
  updatedAt: Date | undefined
  createdAt: Date | undefined
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
export class Technology {
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

  @Column({
    type: 'enum',
    enum: TechCategory,
    default: TechCategory.Other,
  })
  category1: TechCategory | undefined

  @Column({
    type: 'enum',
    enum: TechCategory,
    default: TechCategory.Other,
  })
  category2: TechCategory | undefined

  @Column()
  website: string | undefined

  @Column()
  slug: string | undefined

  @ManyToOne(() => UserProfile, (user) => user.technologies_added, {
    cascade: true,
  })
  added_by: number | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined

  @BeforeInsert()
  async generateSlug() {
    if (typeof this.name === 'string') {
      this.slug = slugify(this.name, '_')
    }
    return this.slug
  }
}
