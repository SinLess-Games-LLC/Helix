import { ConfigNetInterface } from './Net.interface'
import { IntentsBitField } from 'discord.js'

/**
 * Configuration interface for Discord settings.
 *
 * @interface ConfigDiscordInterface
 */
export interface ConfigDiscordInterface {
  botSites: BotSite[]
  developers: number[]
  testers: number[]
  application: {
    id: string
    client: {
      id: number
      secret: string
      intents: IntentsBitField
      partials: string[]
      public_key: string
      bot: {
        token: string
        default_prefix: string
        invite_url: string
      }
      caches: {
        AutoModerationRuleManager: number
        BaseGuildEmojiManager: number
        GuildEmojiManager: number
        GuildBanManager: number
        GuildInviteManager: number
        GuildScheduledEventManager: number
        GuildStickerManager: number
        MessageManager: number
        PresenceManager: number
        StageInstanceManager: number
        ThreadManager: number
        ThreadMemberManager: number
        VoiceStateManager: number
      }
    }
    oauth: {
      redirect_url: string
    }
    support_server: {
      invite_url: string
    }
  }
  api: {
    port: number
    secret: string
    lava_link: {
      password: string
      net: ConfigNetInterface
    }
  }
  sharding: {
    spawnDelay: number
    spawnTimeout: number
    serversPerShard: number
  }
  clustering: {
    enabled: boolean
    shardCount: number
    callbackUrl: string
    masterApi: {
      url: string
      token: string
    }
  }
  jobs: {
    updateServerCount: {
      schedule: string
      log: boolean
      runOnce: boolean
      initialDelaySecs: number
    }
  }
  rateLimiting: {
    commands: {
      amount: number
      interval: number
    }
    buttons: {
      amount: number
      interval: number
    }
    triggers: {
      amount: number
      interval: number
    }
    reactions: {
      amount: number
      interval: number
    }
  }
  logging: {
    pretty: boolean
    rateLimit: {
      minTimeout: number
    }
  }
  debug: {
    override: {
      shardMode: {
        enabled: boolean
        value: string
      }
    }
    dummyMode: {
      enabled: boolean
      whitelist: number[]
    }
  }
}

export interface BotSite {
  name: string
  enabled: boolean
  url: string
  authorization: string
  body: string
}
