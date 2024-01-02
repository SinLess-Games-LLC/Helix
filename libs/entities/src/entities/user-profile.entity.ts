import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Microservice, MicroserviceInterface } from './microservice.entity'
import { Technology, TechnologyInterface } from './technology.entity'
import { News, NewsInterface } from './news.entity'
import { Sex } from '../enums/sex.enum'
import { Sexuality } from '../enums/sexuality.enum'
import { Pronoun } from '../enums/pronoun.enum'
import { Gender } from '../enums/gender.enum'
import { Country } from '../enums/country.enum'

export interface UserProfileInterface {
  id: number
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
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number

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

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
