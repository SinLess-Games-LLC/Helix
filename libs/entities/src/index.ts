import { Microservice } from './entities/microservice.entity'
import { News } from './entities/news.entity'
import { Technology } from './entities/technology.entity'
import { User } from './entities/user.entity'
import { UserProfile } from './entities/user-profile.entity'
import { UserSetting } from './entities/user-setting.entity'
import { Account } from './entities/account.entity'
import { Session } from './entities/session.entity'
import {
  DiscordGuild,
  DiscordDailyStatistics,
  DiscordUser,
  DiscordWeeklyStatistics,
  DiscordMonthlyStatistics,
  DiscordYearlyStatistics,
  Pastebin,
  Image,
} from './entities/discord'

let entities
export default entities = [
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
]

/**
 *  Entities
 */

export { Microservice } from './entities/microservice.entity'
export { News } from './entities/news.entity'
export { Technology } from './entities/technology.entity'
export { User } from './entities/user.entity'
export { UserProfile } from './entities/user-profile.entity'
export { UserSetting } from './entities/user-setting.entity'
export { Account } from './entities/account.entity'
export { Session } from './entities/session.entity'
export { DiscordGuild } from './entities/discord/guild.entity'
export { DiscordUser } from './entities/discord/user.entity'
export { DiscordDailyStatistics } from './entities/discord/statistics/dailyStats.entity'
export { DiscordWeeklyStatistics } from './entities/discord/statistics/weeklyStats.entity'
export { DiscordMonthlyStatistics } from './entities/discord/statistics/monthlyStats.entity'
export { DiscordYearlyStatistics } from './entities/discord/statistics/yearlyStats.entity'
export * from './entities/discord'

/**
 * Interfaces
 *
 * @description Interface exports for each entity
 */
export type { MicroserviceInterface } from './entities/microservice.entity'
export type { NewsInterface } from './entities/news.entity'
export type { TechnologyInterface } from './entities/technology.entity'
export type { UserInterface } from './entities/user.entity'
export type { UserProfileInterface } from './entities/user-profile.entity'
export type { UserSettingInterface } from './entities/user-setting.entity'

/**
 * Enums
 */

export { Country } from './enums/country.enum'
export { Gender } from './enums/gender.enum'
export { Pronoun } from './enums/pronoun.enum'
export { Role } from './enums/roles.enum'
export { Sex } from './enums/sex.enum'
export { Sexuality } from './enums/sexuality.enum'
export { TechCategory } from './enums/tech-category.enum'
