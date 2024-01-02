export type colors = {
  bot: {
    blue: string
    pink: string
  }
  company: {
    gold: string
    silver: string
    black: string
  }
  system: {
    critical: string
    error: string
    warning: string
    info: string
    success: string
  }
}

export type errCodes = {
  System: {
    api: null
    database: null
    gateway: null
    dashboard: null
    discord: {
      API_DOWN: number
      CLOUDFLARE_DOWN: number
      BRAZIL_DOWN: number
      ROTTERDAM_DOWN: number
      MEDIA_PROXY_DOWN: number
      TAX_CALCULATION_SERVICE_DOWN: number
      HONG_KONG_DOWN: number
      CREATOR_PAYOUTS_DOWN: number
      GATEWAY_DOWN: number
      PUSH_NOTIFICATIONS_DOWN: number
      INDIA_DOWN: number
      JAPAN_DOWN: number
      SEARCH_DOWN: number
      VOICE_DOWN: number
      RUSSIA_DOWN: number
      SINGAPORE_DOWN: number
      THIRD_PARTY_DOWN: number
      SOUTH_AFRICA_DOWN: number
      SERVER_WEB_PAGES_DOWN: number
      SOUTH_KOREA_DOWN: number
      PAYMENTS_DOWN: number
      SYDNEY_DOWN: number
      US_CENTRAL_DOWN: number
      US_EAST_DOWN: number
      US_SOUTH_DOWN: number
      US_WEST_DOWN: number
    }
    discordApi: null
    discordBot: null
    cloudflare: {
      SITES_AND_SERVICES_DOWN: number
      ACCESS_DOWN: number
      ALWAYS_ONLINE_DOWN: number
      ANALYTICS_DOWN: number
      API_DOWN: number
      API_SHIELD_DOWN: number
      DASHBOARD_DOWN: number
      DEVELOPERS_DOWN: number
      AUTHORITATIVE_DNS_DOWN: number
      DNS_ROOT_SERVERS_DOWN: number
      DNS_UPDATES_DOWN: number
      RECURSIVE_DNS_DOWN: number
    }
  }
  Bot: {
    AFK: null
    ActionLog: null
    Announcements: null
    AntiRaid: null
    AntiSpam: null
    AutoBan: null
    AutoMessage: null
    AutoMod: null
    AutoPurge: null
    AutoResponder: null
    AutoRoles: null
    Forms: null
    Giveaways: null
    Highlights: null
    Leveling: null
    Logging: null
    MessageEmbedder: null
    Moderation: null
    Music: null
    Polls: null
    Protection: null
    ReactionRoles: null
    Reddit: null
    SlowMode: null
    Starboard: null
    Suggestions: null
    Tags: null
    TemporaryChannels: null
    Tickets: null
    Tupper: null
    Twitch: null
    Utility: null
    Welcome: null
    Youtube: null
  }
}
