import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserProfile } from './user-profile.entity'
import slugify from 'slugify'

export interface MicroserviceInterface {
  id: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  added_by: number
  slug: string
}

@Entity()
export class Microservice {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'text' })
  alt: string

  @ManyToOne(() => UserProfile, userProfile => userProfile.microservices_added)
  added_by: number

  @Column({ type: 'text' })
  slug: string

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, '_')
    return this.slug
  }
}
