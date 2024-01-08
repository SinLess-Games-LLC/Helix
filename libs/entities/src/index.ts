import {
  Microservice,
  News,
  Technology,
  User,
  UserProfile,
  UserSetting,
  Account,
  Session,
  DiscordGuild,
  DiscordUser,
  DiscordDailyStatistics,
  DiscordWeeklyStatistics,
  DiscordMonthlyStatistics,
  DiscordYearlyStatistics,
  Pastebin,
  Image,
  Health,
} from './entities'

export const entities = [
  Microservice,
  News,
  Technology,
  User,
  UserProfile,
  UserSetting,
  Account,
  Session,
  DiscordGuild,
  DiscordUser,
  DiscordDailyStatistics,
  DiscordWeeklyStatistics,
  DiscordMonthlyStatistics,
  DiscordYearlyStatistics,
  Pastebin,
  Image,
  Health,
]

/**
 *  Entities
 */

export {
  Microservice,
  News,
  Technology,
  User,
  UserProfile,
  UserSetting,
  Account,
  Session,
  DiscordGuild,
  DiscordUser,
  DiscordDailyStatistics,
  DiscordWeeklyStatistics,
  DiscordMonthlyStatistics,
  DiscordYearlyStatistics,
  Pastebin,
  Image,
  Health,
} from './entities'

/**
 * Interfaces
 *
 * @description Interface exports for each entity
 */
export type {
  MicroserviceInterface,
  NewsInterface,
  TechnologyInterface,
  UserInterface,
  UserProfileInterface,
  UserSettingInterface,
} from './entities'

/**
 * Enums
 */

export { Country, Gender, Pronoun, Role, Sex, Sexuality, TechCategory } from './enums'
