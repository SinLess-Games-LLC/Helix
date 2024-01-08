import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import {
  Microservice,
  MicroserviceInterface,
  Technology,
  TechnologyInterface,
  News,
  NewsInterface,
} from '../site'
import { Sex, Gender, Sexuality, Pronoun, Country } from '../../enums'
import { BaseEntity } from '../base.entity'

export interface UserProfileInterface {
  sid: number
  firstName: string
  middleName: string
  lastName: string
  avatar: string
  birthday: Date
  sex: Sex
  Gender: Gender
  sexualOrientation?: Sexuality
  Pronoun: Pronoun
  country: Country
  microservices_added: MicroserviceInterface[]
  technologies_added: TechnologyInterface[]
  news_added: NewsInterface[]
  email_verified: boolean
  age_verified: boolean
  updatedAt: Date
  createdAt: Date
}

@Entity()
/**
 * @class UserProfile
 * @description
 * A user profile is a collection of information about a user.
 */
export class UserProfile extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  firstName: string

  @Column({ type: 'text', nullable: true })
  middleName: string

  @Column({ type: 'text', nullable: true })
  lastName: string

  @Column({ type: 'text', nullable: true })
  avatar: string

  @Column({ type: 'text', nullable: true })
  birthday: Date

  @Column({ type: 'enum', enum: Sex, default: Sex.PreferNotToSay })
  sex: Sex

  @Column({ type: 'enum', enum: Gender, default: Gender.PreferNotToSay })
  Gender: Gender

  @Column({ type: 'enum', enum: Sexuality, default: Sexuality.PreferNotToSay })
  sexualOrientation?: Sexuality

  @Column({ type: 'enum', enum: Pronoun, default: Pronoun.Other })
  Pronoun: Pronoun

  @Column({ type: 'enum', enum: Country, default: Country.PreferNotToSay })
  country: Country

  @OneToMany(() => Microservice, microservice => microservice.added_by, {
    eager: true,
  })
  @JoinColumn()
  microservices_added: Microservice[]

  @OneToMany(() => Technology, technology => technology.added_by, {
    eager: true,
  })
  @JoinColumn()
  technologies_added: Technology[]

  @OneToMany(() => News, news => news.added_by, {
    eager: true,
  })
  @JoinColumn()
  news_added: News[]

  @Column({ type: 'boolean', default: false })
  email_verified: boolean

  @Column({ type: 'boolean', default: false })
  age_verified: boolean
}
