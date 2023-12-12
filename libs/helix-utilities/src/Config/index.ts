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
  private lavalink: ConfigLavalinkInterface

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
      port: parseInt(process.env.API_PORT as string) || 3306,
      folder_enabled:
        this.convertToBoolean(process.env.API_FOLDER_ENABLED) || false,
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
          charset: 'utf-8',
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
      application: {
        id: parseInt(process.env.DISCORD_APPLICATION_ID) || 0,
      },
      bot: {
        token: process.env.DISCORD_BOT_TOKEN || '',
        default_prefix: process.env.DISCORD_BOT_DEFAULT_PREFIX || '',
        invite_url: process.env.DISCORD_BOT_INVITE_URL || '',
      },
      client: {
        id: parseInt(process.env.DISCORD_CLIENT_ID) || 0,
        secret: process.env.DISCORD_CLIENT_SECRET || '',
      },
      support_server: {
        invite_url: process.env.DISCORD_SUPPORT_SERVER_INVITE_URL || '',
      },
      public_key: process.env.DISCORD_PUBLIC_KEY || '',
      developers:
        this.processListOfIds(process.env.DISCORD_DEVELOPER_IDS) || [],
      testers: this.processListOfIds(process.env.DISCORD_TESTER_IDS) || [],
      oauth: {
        redirect_url: process.env.OAUTH2_REDIRECT_URL || '',
      },
      lava_link: {
        password: process.env.LAVALINK_SERVER_PASSWORD || '',
        net: {
          host: process.env.LAVALINK_SERVER_HOST || 'localhost',
          port: parseInt(process.env.LAVALINK_SERVER_PORT) || 2333,
        },
      },
    }
    return discord
  }
  private loadGithub() {
    const github: ConfigGithubInterface = {
      id: process.env.GITHUB_ID,
      secret: process.env.GITHUB_SECRET || '',
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
