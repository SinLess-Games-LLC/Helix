import { Sex, Sexuality, Country, Gender, Pronoun } from '@helix/entities'

export interface UserProfile {
  firstName?: string
  middleName?: string
  lastName?: string
  avatar?: string
  birthday?: Date
  sex?: Sex
  Gender?: Gender
  sexualOrientation?: Sexuality
  Pronoun?: Pronoun
  country?: Country
}
