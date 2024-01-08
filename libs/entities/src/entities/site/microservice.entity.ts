import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm'
import { UserProfile } from '../user'
import slugify from 'slugify'
import { BaseEntity } from '../base.entity'

export interface MicroserviceInterface {
  sid: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  added_by: number
  slug: string
}

@Entity()
export class Microservice extends BaseEntity {
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

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, '_')
    return this.slug
  }
}
