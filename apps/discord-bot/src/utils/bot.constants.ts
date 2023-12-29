import { botColors, errCodes } from '../typings/bot.types'

export const discordStatusSummaryUrl = 'https://discordstatus.com/api/v2/summary.json'
export const discordStatusUrl = 'https://discordstatus.com/api/v2/status.json'
export const cloudflareStatusSummaryUrl = 'https://www.cloudflarestatus.com/api/v2/summary.json'

export const requiredDiscordComponents = [
  'API',
  'CloudFlare',
  'Media Proxy',
  'Gateway',
  'Push Notifications',
  'Search',
  'Voice',
  'Client',
  'Third Party',
  'Server Web Pages',
  'US Central',
  'US East',
  'US South',
  'US West',
]

type WaitFunction = (ms: number, value?: any) => Promise<ReturnType<typeof setTimeout>>
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const wait: WaitFunction = require('node:timers/promises').setTimeout

export const BotColors: botColors = {
  bot: {
    blue: '#022371',
    pink: '#f6066f',
  },
  company: {
    gold: '#daa520',
    silver: '#d1cfd0',
    black: '#000000',
  },
  system: {
    critical: '#FF0000',
    error: '#EE4B2B',
    warning: '#FFEA00',
    info: '#0000FF',
    success: '#00ff00',
  },
}

export const ErrorCodes: errCodes = {
  // S-xxx
  System: {
    // S-1xx
    api: null,
    // S-2xx
    database: null,
    // S-3xx
    gateway: null,
    // S-4xx
    dashboard: null,
    // S-5xx
    discord: {
      API_DOWN: 500,
      CLOUDFLARE_DOWN: 501,
      BRAZIL_DOWN: 502,
      ROTTERDAM_DOWN: 503,
      MEDIA_PROXY_DOWN: 504,
      TAX_CALCULATION_SERVICE_DOWN: 505,
      HONG_KONG_DOWN: 506,
      CREATOR_PAYOUTS_DOWN: 507,
      GATEWAY_DOWN: 508,
      PUSH_NOTIFICATIONS_DOWN: 509,
      INDIA_DOWN: 510,
      JAPAN_DOWN: 511,
      SEARCH_DOWN: 512,
      VOICE_DOWN: 513,
      RUSSIA_DOWN: 514,
      SINGAPORE_DOWN: 515,
      THIRD_PARTY_DOWN: 516,
      SOUTH_AFRICA_DOWN: 517,
      SERVER_WEB_PAGES_DOWN: 518,
      SOUTH_KOREA_DOWN: 519,
      PAYMENTS_DOWN: 520,
      SYDNEY_DOWN: 521,
      US_CENTRAL_DOWN: 522,
      US_EAST_DOWN: 523,
      US_SOUTH_DOWN: 524,
      US_WEST_DOWN: 525,
    },
    // S-6xx
    discordApi: null,
    // S-7xx
    discordBot: null,
    // S-8xx
    cloudflare: {
      SITES_AND_SERVICES_DOWN: 800,
      ACCESS_DOWN: 801,
      ALWAYS_ONLINE_DOWN: 802,
      ANALYTICS_DOWN: 803,
      API_DOWN: 804,
      API_SHIELD_DOWN: 805,
      DASHBOARD_DOWN: 806,
      DEVELOPERS_DOWN: 807,
      AUTHORITATIVE_DNS_DOWN: 808,
      DNS_ROOT_SERVERS_DOWN: 809,
      DNS_UPDATES_DOWN: 810,
      RECURSIVE_DNS_DOWN: 811,
    },
  },
  // B-xxx
  Bot: {
    // B-0-1xx
    AFK: null,
    // B-0-2xx
    ActionLog: null,
    // B-0-3xx
    Announcements: null,
    // B-0-4xx
    AntiRaid: null,
    // B-0-5xx
    AntiSpam: null,
    // B-0-6xx
    AutoBan: null,
    // B-0-7xx
    AutoMessage: null,
    // B-0-8xx
    AutoMod: null,
    // B-0-9xx
    AutoPurge: null,
    // B-1-1xx
    AutoResponder: null,
    // B-1-2xx
    AutoRoles: null,
    // B-1-3xx
    Forms: null,
    // B-1-4xx
    Giveaways: null,
    // B-1-5xx
    Highlights: null,
    // B-1-6xx
    Leveling: null,
    // B-1-7xx
    Logging: null,
    // B-1-8xx
    MessageEmbedder: null,
    // B-1-9xx
    Moderation: null,
    // B-2-1xx
    Music: null,
    // B-2-2xx
    Polls: null,
    // B-2-3xx
    Protection: null,
    // B-2-4xx
    ReactionRoles: null,
    // B-2-5xx
    Reddit: null,
    // B-2-6xx
    SlowMode: null,
    // B-2-7xx
    Starboard: null,
    // B-2-8xx
    Suggestions: null,
    // B-2-9xx
    Tags: null,
    // B-3-1xx
    TemporaryChannels: null,
    // B-3-2xx
    Tickets: null,
    // B-3-3xx
    Tupper: null,
    // B-3-4xx
    Twitch: null,
    // B-3-5xx
    Utility: null,
    // B-3-6xx
    Welcome: null,
    // B-3-7xx
    Youtube: null,
  },
}
