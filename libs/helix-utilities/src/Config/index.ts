import * as dotenv from 'dotenv'
import { ConfigApiInterface } from './interfaces/Api.interface'
import { ConfigConsulInterface } from './interfaces/Consul.interface'
import { ConfigDatabaseInterface } from './interfaces/Database.interface'
import { ConfigElasticStackInterface } from './interfaces/elasticstack.interface'
import { ConfigGeneralInterface } from './interfaces/General.interface'
import { ConfigLoggingInterface } from './interfaces/Logging.interface'
import { ConfigNextInterface } from './interfaces/Next.interface'
import { ConfigMessageBrokerInterface } from './interfaces/MessageBroker.interface'
import { ConfigAuth0Interface } from './interfaces/Auth0.interface'
import { ConfigDiscordInterface } from './interfaces/Discord.interface'
import { ConfigGithubInterface } from './interfaces/Github.interface'
import { ConfigGoogleInterface } from './interfaces/Google.interface'
import { ConfigOpenAiInterface } from './interfaces/OpenAi.interface'
import { ConfigTwitchInterface } from './interfaces/Twitch.interface'
import { ConfigLavalinkInterface } from './interfaces/Lavalink.interface'
import { colors, errCodes } from './config.type'
import { IntentsBitField } from 'discord.js'
dotenv.config()

export class HelixConfiguration {
  public readonly api: ConfigApiInterface
  public readonly consul: ConfigConsulInterface
  public readonly database: ConfigDatabaseInterface
  public readonly elastic: ConfigElasticStackInterface
  public readonly general: ConfigGeneralInterface
  public readonly logging: ConfigLoggingInterface
  public readonly next: ConfigNextInterface
  public readonly message: ConfigMessageBrokerInterface
  public readonly auth0: ConfigAuth0Interface
  public readonly discord: ConfigDiscordInterface
  public readonly github: ConfigGithubInterface
  public readonly google: ConfigGoogleInterface
  public readonly open_ai: ConfigOpenAiInterface
  public readonly twitch: ConfigTwitchInterface
  public readonly lavalink: ConfigLavalinkInterface
  public readonly Colors: colors
  public readonly ErrorCodes: errCodes

  constructor() {
    this.api = this.loadApi()
    this.consul = this.loadConsul()
    this.database = this.loadDatabase()
    this.elastic = this.loadElastic()
    this.general = this.loadGeneral()
    this.logging = this.loadLogging()
    this.lavalink = this.loadLavalink()
    this.next = this.loadNext()
    this.message = this.loadMessage()
    this.auth0 = this.loadAuth0()
    this.discord = this.loadDiscord()
    this.github = this.loadGithub()
    this.google = this.loadGoogle()
    this.open_ai = this.loadOpen_ai()
    this.twitch = this.loadTwitch()

    this.Colors = {
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

    this.ErrorCodes = {
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
  }

  private convertToBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') {
      return true
    }

    if (value === 'false') {
      return false
    } else {
      return undefined // Return a default value or throw an error as needed.
    }
  }

  private processListOfIds(value: string | undefined): number[] | undefined {
    const unprocessed = value ? [value] : []
    const processed: number[] = []

    try {
      for (const id of unprocessed) {
        const parsedId = parseInt(id)
        if (!isNaN(parsedId)) {
          processed.push(parsedId)
        }
      }
      return processed
    } catch (error) {
      return undefined
    }
  }

  private loadApi() {
    const api: ConfigApiInterface = {
      enabled: this.convertToBoolean(process.env.API_ENABLED) || false,
      port: parseInt(process.env.API_PORT) || 3306,
      folder_enabled: this.convertToBoolean(process.env.API_FOLDER_ENABLED) || false,
      jwt: { secret: process.env.API_JWT_SECRET || '' },
    }
    return api
  }

  private loadConsul() {
    const consul: ConfigConsulInterface = {
      net: {
        host: process.env.CONSUL_HOST || 'localhost',
        port: parseInt(process.env.CONSUL_PORT) || 8600,
      },
      user: {
        username: process.env.CONSUL_USERNAME || '',
        password: process.env.CONSUL_Password || '',
      },
    }
    return consul
  }

  private loadDatabase() {
    const database: ConfigDatabaseInterface = {
      mongo_db: {
        net: {
          host: process.env.MYSQL_HOST || 'localhost',
          port: parseInt(process.env.MONGODB_PORT) || 27017,
        },
        user: {
          username: process.env.MONGODB_USER || '',
          password: process.env.MONGODB_PASSWORD || '',
        },
        database: {
          name: process.env.MONGODB_DB_NAME || '',
        },
      },
      mysql: {
        connection_url: process.env.MYSQL_DATABASE_URL || '',
        user: {
          username: process.env.MYSQL_USER || '',
          password: process.env.MYSQL_PASSWORD || '',
        },
        net: {
          host: process.env.MYSQL_HOST || 'localhost',
          port: parseInt(process.env.MYSQL_PORT) || 3306,
        },
        database: {
          name: process.env.MYSQL_DATABASE || '',
          charset: 'utf8mb4',
          timezone: process.env.TIMEZONE || 'America/Denver',
        },
      },
      redis: {
        user: {
          username: process.env.REDIS_USERNAME || '',
          password: process.env.REDIS_PASSWORD || '',
        },
        net: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
        },
      },
    }
    return database
  }

  private loadElastic() {
    const elastic: ConfigElasticStackInterface = {
      search: {
        net: {
          host: process.env.ELASTICSEARCH_HOST || 'localhost',
          port: parseInt(process.env.ELASTICSEARCH_PORT) || 9200,
        },
        user: {
          username: process.env.ELASTICSEARCH_USERNAME || '',
          password: process.env.ELASTICSEARCH_PASSWORD || '',
        },
      },
      kibana: {
        net: {
          host: process.env.KIBANA_HOST || 'localhost',
          port: parseInt(process.env.KIBANA_PORT) || 5601,
        },
        user: {
          username: process.env.KIBANA_USERNAME || '',
          password: process.env.KIBANA_PASSWORD || '',
        },
      },
      logstash: {
        net: {
          host: process.env.LOGSTASH_HOST || 'localhost',
          port: parseInt(process.env.LOGSTASH_PORT) || 9600,
        },
        user: {
          username: process.env.LOGSTASH_USERNAME || '',
          password: process.env.LOGSTASH_PASSWORD || '',
        },
      },
    }
    return elastic
  }

  private loadGeneral() {
    const general: ConfigGeneralInterface = {
      config_author: process.env.AUTHOR_NAME || '',
      debug_level: process.env.DEBUG_LEVEL || 'Info',
      debug: this.convertToBoolean(process.env.DEBUG) || false,
      version: process.env.VERSION || '',
      config_version: process.env.CONFIG_VERSION || '',
      timezone: process.env.TIMEZONE || '',
      mode: process.env.MODE || 'Production',
      app_specifier: process.env.APP_SPECIFIER || '',
      admin: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'password',
      },
    }
    return general
  }

  private loadLogging() {
    const logging: ConfigLoggingInterface = {
      enabled: this.convertToBoolean(process.env.LOGGING_ENABLED) || false,
      location: {
        console: {
          enabled: this.convertToBoolean(process.env.LOG_TO_CONSOLE) || false,
        },
        file: {
          enabled: this.convertToBoolean(process.env.LOG_TO_FILE) || false,
          path: process.env.LOG_FILE || 'app.log',
        },
      },
    }
    return logging
  }

  private loadNext() {
    const next: ConfigNextInterface = {
      auth: {
        secret: process.env.NEXTAUTH_SECRET || '',
        url: process.env.NEXTAUTH_URL || '',
      },
    }
    return next
  }

  private loadMessage() {
    const message: ConfigMessageBrokerInterface = {
      brokers: {
        rabbitmq: {
          user: {
            username: process.env.RABBITMQ_USERNAME || '',
            password: process.env.RABBITMQ_PASSWORD || '',
          },
          net: {
            host: process.env.RABBITMQ_HOST || 'localhost',
            port: parseInt(process.env.RABBITMQ_PORT) || 5672,
          },
        },
      },
    }
    return message
  }

  private loadAuth0() {
    const auth0: ConfigAuth0Interface = {
      secret: process.env.AUTH0_SECRET || '',
      base_url: process.env.AUTH0_BASE_URL || '',
      issuer: {
        base_url: process.env.AUTH0_ISSUER_BASE_URL || '',
      },
      client: {
        id: process.env.AUTH0_CLIENT_ID || '',
        secret: process.env.AUTH0_CLIENT_SECRET || '',
      },
      audience: process.env.AUTH0_AUDIENCE || '',
      scope: process.env.AUTH0_SCOPE || '',
    }
    return auth0
  }

  private loadDiscord() {
    const discord: ConfigDiscordInterface = {
      botSites: [
        {
          name: 'top.gg',
          enabled: false,
          url: 'https://top.gg/api/bots/<BOT_ID>/stats',
          authorization: '<TOKEN>',
          body: '{"server_count":{{SERVER_COUNT}}}',
        },
        {
          name: 'bots.ondiscord.xyz',
          enabled: false,
          url: 'https://bots.ondiscord.xyz/bot-api/bots/<BOT_ID>/guilds',
          authorization: '<TOKEN>',
          body: '{"guildCount":{{SERVER_COUNT}}}',
        },
        {
          name: 'discord.bots.gg',
          enabled: false,
          url: 'https://discord.bots.gg/api/v1/bots/<BOT_ID>/stats',
          authorization: '<TOKEN>',
          body: '{"guildCount":{{SERVER_COUNT}}}',
        },
        {
          name: 'discordbotlist.com',
          enabled: false,
          url: 'https://discordbotlist.com/api/bots/<BOT_ID>/stats',
          authorization: 'Bot <TOKEN>',
          body: '{"guilds":{{SERVER_COUNT}}}',
        },
        {
          name: 'discords.com',
          enabled: false,
          url: 'https://discords.com/bots/api/bot/<BOT_ID>',
          authorization: '<TOKEN>',
          body: '{"server_count":{{SERVER_COUNT}}}',
        },
        {
          name: 'disforge.com',
          enabled: false,
          url: 'https://disforge.com/api/botstats/<BOT_ID>',
          authorization: '<TOKEN>',
          body: '{"servers":{{SERVER_COUNT}}}',
        },
      ],
      developers: this.processListOfIds(process.env.DISCORD_DEVELOPER_IDS) || [],
      testers: this.processListOfIds(process.env.DISCORD_TESTER_IDS) || [],
      application: {
        id: process.env.DISCORD_APPLICATION_ID || '0',
        client: {
          id: parseInt(process.env.DISCORD_CLIENT_ID) || 0,
          intents: new IntentsBitField(3276799),
          partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
          secret: process.env.DISCORD_CLIENT_SECRET || '',
          public_key: process.env.DISCORD_PUBLIC_KEY || '',
          bot: {
            token: process.env.DISCORD_BOT_TOKEN || '',
            default_prefix: process.env.DISCORD_BOT_DEFAULT_PREFIX || '',
            invite_url: process.env.DISCORD_BOT_INVITE_URL || '',
          },
          caches: {
            AutoModerationRuleManager: 0,
            BaseGuildEmojiManager: 0,
            GuildEmojiManager: 0,
            GuildBanManager: 0,
            GuildInviteManager: 0,
            GuildScheduledEventManager: 0,
            GuildStickerManager: 0,
            MessageManager: 0,
            PresenceManager: 0,
            StageInstanceManager: 0,
            ThreadManager: 0,
            ThreadMemberManager: 0,
            VoiceStateManager: 0,
          },
        },
        oauth: {
          redirect_url: process.env.OAUTH2_REDIRECT_URL || '',
        },
        support_server: {
          invite_url: process.env.DISCORD_SUPPORT_SERVER_INVITE_URL || '',
        },
      },
      api: {
        port: parseInt(process.env.DISCORD_API_PORT) || 0,
        secret: process.env.DISCORD_API_SECRET || '',
        lava_link: {
          password: process.env.LAVALINK_SERVER_PASSWORD || '',
          net: {
            host: process.env.LAVALINK_SERVER_HOST || 'localhost',
            port: parseInt(process.env.LAVALINK_SERVER_PORT) || 2333,
          },
        },
      },
      sharding: {
        spawnDelay: 5,
        spawnTimeout: 300,
        serversPerShard: 1000,
      },
      clustering: {
        enabled: false,
        shardCount: 16,
        callbackUrl: `http://localhost:${process.env.DISCORD_API_PORT}/`,
        masterApi: {
          url: 'http://localhost:5000/',
          token: 'd7f2a9fe-946f-4bb5-a241-dc5a64aa3709',
        },
      },
      jobs: {
        updateServerCount: {
          schedule: '0 */10 * * * *',
          log: false,
          runOnce: false,
          initialDelaySecs: 0,
        },
      },
      rateLimiting: {
        commands: {
          amount: 10,
          interval: 30,
        },
        buttons: {
          amount: 10,
          interval: 30,
        },
        triggers: {
          amount: 10,
          interval: 30,
        },
        reactions: {
          amount: 10,
          interval: 30,
        },
      },
      logging: {
        pretty: true,
        rateLimit: {
          minTimeout: 30,
        },
      },
      debug: {
        override: {
          shardMode: {
            enabled: false,
            value: 'worker',
          },
        },
        dummyMode: {
          enabled: false,
          whitelist: [],
        },
      },
    }
    return discord
  }

  private loadGithub() {
    const github: ConfigGithubInterface = {
      credentials: {
        id: process.env.GITHUB_ID || '',
        secret: process.env.GITHUB_SECRET || '',
      },
      gitRemoteRepo: process.env.GITHUB_REMOTE_REPO || '',
    }
    return github
  }

  private loadGoogle() {
    const google: ConfigGoogleInterface = {
      client: {
        id: process.env.GOOGLE_CLIENT_ID || '',
        secret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
    }
    return google
  }

  private loadOpen_ai() {
    const open_ai: ConfigOpenAiInterface = {
      org_id: process.env.OPENAI_ORG_ID || '',
      api_key: process.env.OPENAI_API_KEY || '',
    }
    return open_ai
  }

  private loadTwitch() {
    const twitch: ConfigTwitchInterface = {
      client: {
        id: process.env.TWITCH_CLIENT_ID || '',
        secret: process.env.TWITCH_CLIENT_SECRET || '',
      },
    }
    return twitch
  }

  private loadLavalink() {
    const lavalink: ConfigLavalinkInterface = {
      host: process.env.LAVALINK_SERVER_HOST || 'localhost',
      port: parseInt(process.env.LAVALINK_SERVER_PORT) || 2333,
      password: process.env.LAVALINK_SERVER_PASSWORD || '',
    }
    return lavalink
  }
}
