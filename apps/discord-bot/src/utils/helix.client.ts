import { Client, ClientOptions, Collection, IntentsBitField, REST, Routes } from 'discord.js'
import {
  BotColors,
  botColors,
  HelixConfiguration,
  HelixLogger,
  errCodes,
  ErrorCodes,
} from '@helix/helix-utilities'
import express, { Express } from 'express'
import { RootRouter } from '../routers/root.router'
import { CommandType } from '../typings/command.type'
import * as path from 'path'
import * as fs from 'fs'
import { HealthRouter } from '../routers/health.router'
import { initializeDatabase } from './database.functions'
import { DataSource } from 'typeorm'
import { getRedisClient } from './database.constants'
import { RedisModules, RedisFunctions, RedisScripts } from 'redis'
import { RedisClientType } from '@redis/client'

export class HelixClient extends Client {
  private logger: HelixLogger = new HelixLogger({ name: 'Helix Client' })
  private commandLogger = new HelixLogger({ name: 'Commands Register' })
  private eventLogger = new HelixLogger({ name: 'Event Register' })
  private apiLogger = new HelixLogger({ name: 'API' })

  private api: Express = express()
  public prefix: string = 'h!'
  public commands: Collection<string, CommandType> = new Collection()

  public readonly config: HelixConfiguration = new HelixConfiguration()
  public readonly Colors: botColors = BotColors
  public readonly ErrorCodes: errCodes = ErrorCodes
  public ready: boolean = false
  public cache: RedisClientType<
    {
      graph: any
      json: any
      ft: any
      ts: any
      bf: any
      cms: any
      cf: any
      tDigest: any
      topK: any
    } & RedisModules,
    RedisFunctions,
    RedisScripts
  >

  public _commands: CommandType[] = []
  public readonly _token: string = this.config.discord.application.client.bot.token
  public readonly _prefix: string = 'h!'
  private readonly _rest: REST = new REST({ version: '9' }).setToken(this._token)
  /**
   * Represents the Discord intents configuration for the HelixClient.
   *
   * Intents define which events the bot will receive from Discord.
   * The value is calculated using the Discord Intents Calculator.
   *
   * @see {@link https://discord-intents-calculator.vercel.app/} | Discord Intents Calculator
   */
  public _intents: IntentsBitField = new IntentsBitField(3276799)
  public readonly _options: ClientOptions = {
    intents: this._intents,
    shards: 'auto',
  }
  public Database: DataSource

  constructor(options: ClientOptions) {
    super(options)
  }

  public setReady(bool: boolean) {
    this.logger.info('Setting ready')
    return (this.ready = bool)
  }
  private async _init() {
    try {
      this.fetchRouters()
      // register commands
      await this._registerCommands()
      this.logger.info(`Registered ${this.commands.size} commands`)
      this._registerEvents()
      await initializeDatabase()
      this.cache = await getRedisClient()
    } catch (err: unknown) {
      this.logger.critical('Failed to initialize Helix Client')
      this.logger.error(err as string)
    }
  }

  private fetchRouters() {
    this.apiLogger.info('Fetching Routers')
    this.api.use(RootRouter)
    this.api.use(HealthRouter)
  }

  private async _registerCommands(): Promise<void> {
    await this._deleteCommands()
    try {
      this.commandLogger.info('Registering Commands')
      const commandFileDir: string = path.join(__dirname, '..', 'commands')

      // check if command directory exists
      if (!fs.existsSync(commandFileDir)) {
        return this.commandLogger.critical(
          `Command files directory does not exist: ${commandFileDir}`
        )
      }

      // checks if it is in the dist directory
      if (commandFileDir.toString().includes('dist')) {
        this.commandLogger.info(`Command files directory is the distribution directory.`)
      }

      // read command files directory
      const commandGroupFolders: string[] = fs.readdirSync(commandFileDir)

      // loop through command group folders
      for (const commandGroupFolder of commandGroupFolders) {
        const commandGroupFolderDir: string = path.join(commandFileDir, commandGroupFolder)
        const commandFiles: string[] = fs.readdirSync(commandGroupFolderDir)

        // loop through command files
        for (const commandFile of commandFiles) {
          const commandFilePath: string = path.join(commandGroupFolderDir, commandFile)
          // skip source map files
          if (commandFile.endsWith('.map')) {
            continue
          }

          // import command
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const command: CommandType = require(commandFilePath)
          // push command to commands array
          this._commands.push(command)
          if ('data' in command && 'execute' in command) {
            // set command to client commands collection
            this.commands.set(command.data.name, command)
          } else {
            this.commandLogger.error(
              `[WARNING] The command at ${commandFile} is missing a required "data" or "execute" property.`
            )
          }
        }
      }
    } catch (err: unknown) {
      this.logger.critical('Failed to register commands')
      this.logger.error(err as string)
    }

    // register commands
    try {
      this.commandLogger.info('Registering global commands')

      const commands = this._commands.map(command => command.data.toJSON())
      this.commandLogger.debug(`Commands: ${JSON.stringify(commands)}`)

      this.commandLogger.info('pushing commands to Discord')
      // await this._rest.put(Routes.applicationCommands('1143176646074052698'), { body: commands })
      this.commandLogger.info('Registered global commands')
    } catch (err) {
      this.commandLogger.error(`An error occurred while registering global commands: \n${err}`)
    }
  }

  private async _deleteCommands() {
    try {
      const cmd = await this._rest.get(Routes.applicationCommands('1143176646074052698'))
      // delete global commands
      if (cmd !== undefined) {
        this.commandLogger.debug('Deleting global commands')
        await this._rest.put(Routes.applicationCommands('1143176646074052698'), { body: [] })
        this.commandLogger.info('Deleted global commands')
      } else {
        this.commandLogger.info('No global commands to delete')
      }
    } catch (err: unknown) {
      this.commandLogger.error(err as string)
    }
  }

  private _registerEvents() {
    this.eventLogger.info('Registering Events')
    const eventFileDir: string = path.join(__dirname, '..', 'events')

    // Check if the event files directory exists
    if (!fs.existsSync(eventFileDir)) {
      return new Error(`Event files directory does not exist: ${eventFileDir}`)
    }

    // Check if the event files directory is within the "dist" directory
    if (eventFileDir.includes('dist')) {
      this.eventLogger.debug(`Event files directory is the distribution directory.`)
      this.eventLogger.debug(`Reading event files directory: ${eventFileDir}`)
    }

    try {
      const eventGroupFolders: string[] = fs.readdirSync(eventFileDir)

      for (const eventGroupFolder of eventGroupFolders) {
        const eventGroupFolderDir: string = path.join(eventFileDir, eventGroupFolder)
        // Check if the event group folder is a directory
        if (fs.statSync(eventGroupFolderDir).isDirectory()) {
          const eventFiles: string[] = fs.readdirSync(eventGroupFolderDir)
          for (const eventFile of eventFiles) {
            const eventFilePath: string = path.join(eventGroupFolderDir, eventFile)

            if (eventFile.endsWith('.map')) {
              continue
            }

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const event = require(eventFilePath)

            if (event.enabled) {
              if (event.once) {
                this.once(event.name, (...args) => event.execute(...args))
              } else {
                this.on(event.name, (...args) => event.execute(...args))
              }
            }
          }
        } else {
          this.eventLogger.error(`Skipping non-directory: ${eventGroupFolder}`)
        }
      }
    } catch (error) {
      this.eventLogger.error(`Error registering events: ${error}`)
    }
  }

  public async start() {
    try {
      await this._init()
      /**
       * Client
       */
      this.logger.info('Logging in to discord')
      await this.login(this._token)
      this.logger.info('Helix logged into Discord')
      this.setReady(true)
      this.logger.debug(`bot ready: ${this.ready}`)
      /**
       * Api
       */
      this.logger.info('Starting Helix API')
      this.api.listen(this.config.discord.api.port || 8001)
      this.logger.info(
        `Helix API Started \n http://localhost:${this.config.discord.api.port || 8001}/`
      )
    } catch (err: unknown) {
      this.logger.critical('Failed to start Helix Client')
      this.logger.error(err as string)
    }
  }

  public async stop() {
    this.logger.debug('Stopping Helix Client')
    this.logger.info('Helix Client Stopped')
    await this.destroy()
  }
}
