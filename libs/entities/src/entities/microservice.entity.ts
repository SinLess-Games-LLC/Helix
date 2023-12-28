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
  id: number | undefined
  name: string | undefined
  description: string | undefined
  content: string | undefined
  image: string | undefined
  alt: string | undefined
  added_by: number | undefined
  slug: string | undefined
}

@Entity()
export class Microservice {
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

  @ManyToOne(() => UserProfile, userProfile => userProfile.microservices_added)
  added_by: number | undefined

  @Column({ unique: true, default: '' })
  slug: string | undefined

  @UpdateDateColumn()
  updatedAt: Date | undefined

  @CreateDateColumn()
  createdAt: Date | undefined

  @BeforeInsert()
  generateSlug() {
    if (typeof this.name === 'string') {
      this.slug = slugify(this.name, '_')
    }
    return this.slug
  }
}
