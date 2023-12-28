import { Client, ClientOptions, Collection, IntentsBitField, REST, Routes } from 'discord.js'
import { HelixConfiguration, HelixLogger } from '@helix/helix-utilities'
import express, { Express } from 'express'
import { BotColors, ErrorCodes } from './bot.constants'
import { botColors, errCodes } from '../typings/bot.types'
import { RootRouter } from '../routers/root.router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CommandType } from '../typings/command.type'
import * as path from 'path'
import * as fs from 'fs'

export class HelixClient extends Client {
  logger: HelixLogger = new HelixLogger({ name: 'Helix Client' })
  private commandLogger = new HelixLogger({ name: 'Commands Register' })
  private eventLogger = new HelixLogger({ name: 'Event Register' })
  private api: Express = express()
  private _globalPrefix: string = '/api/v1'
  public prefix: string = 'h!'
  public _commands: CommandType[] = []
  public commands: Collection<string, CommandType> = new Collection()
  public readonly startTimeStamp: number = Date.now()

  public readonly config: HelixConfiguration = new HelixConfiguration()
  public readonly Colors: botColors = BotColors
  public readonly ErrorCodes: errCodes = ErrorCodes

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
   *
   * @type {IntentsBitField}
   * @private
   * @memberof HelixClient
   * @instance
   *
   * @default 3276799
   * @description The default value includes all non-privileged and privileged intents.
   */
  public _intents: IntentsBitField = new IntentsBitField(3276799)
  public readonly _options: ClientOptions = {
    intents: this._intents,
    shards: 'auto',
  }

  constructor(options: ClientOptions) {
    super(options)
  }

  private async _init() {
    // set global prefix of api to /api/v1
    this.api.settings.prefix = this._globalPrefix
    this.api.use(this._globalPrefix, RootRouter)
    // set up cors
    this.api.use(cors())
    // set up cookie parser
    this.api.use(cookieParser())
    // register commands
    await this._registerCommands()
    this.logger.info(`Registered ${this.commands.size} commands`)
    this._registerEvents()
  }

  /**
   * Registers commands from the specified directory and its subdirectories.
   *
   * @private
   * @async
   * @method
   * @memberof HelixClient
   * @instance
   *
   * @returns {Promise<void>} A Promise that resolves when command registration is complete.
   *
   * @throws {Error} If there is an error during the command registration process.
   */
  private async _registerCommands(): Promise<void> {
    await this._deleteCommands()

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

    // register commands
    try {
      this.commandLogger.info('Registering global commands')
      const registeredCommands = await this._rest.get(
        Routes.applicationCommands('1143176646074052698')
      )
      this.commandLogger.debug(`Registered commands: ${JSON.stringify(registeredCommands)}`)

      const commands = this._commands.map(command => command.data.toJSON())
      this.commandLogger.debug(`Commands: ${JSON.stringify(commands)}`)

      await this._rest.put(Routes.applicationCommands('1143176646074052698'), { body: commands })
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
                return this.once(event.name, (...args) => event.execute(...args))
              } else {
                return this.on(event.name, (...args) => event.execute(...args))
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
      try {
        this.logger.info('Logging in to discord')
        await this.login(this._token)
        this.logger.info('Helix logged into Discord')
      } catch (err: unknown) {
        this.logger.critical('Failed to Login to Discord')
        this.logger.error(err as string)
      }
      /**
       * Api
       */
      try {
        this.logger.info('Starting Helix API')
        this.api.listen(this.config.discord.api.port || 3000)
        this.logger.info('Helix API Started')
      } catch (err: unknown) {
        this.logger.critical('Failed to start Helix API')
        this.logger.error(err as string)
      }
    } catch (err: unknown) {
      this.logger.critical('Failed to start Helix Client')
      this.logger.error(err as string)
    }
  }

  public async stop() {
    this.logger.debug('Stopping Helix Client')
    await this.destroy()
    this.logger.info('Helix Client Stopped')
  }
}
