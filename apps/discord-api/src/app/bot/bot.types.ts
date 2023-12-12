export type botColors = {
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
    discord: null
    discordApi: null
    discordBot: null
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
