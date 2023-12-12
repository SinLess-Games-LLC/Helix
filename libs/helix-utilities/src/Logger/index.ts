// import { Chalk, ChalkInstance } from 'chalk'

export type logLevel =
  | 'critical'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'debug'
  | 'trace'

export interface LoggerOptions {
  level?: logLevel
  name?: string
}

export enum loggerColors {
  critical = '\u001b[31m', // red
  warning = '\u001b[33m', // yellow
  success = '\u001b[32m', // green
  info = '\u001b[34m', // blue
  debug = '\u001b[36m', // cyan
  trace = '\u001b[35m', // magenta
  message = '\u001b[37m', // white
}

export class HelixLogger {
  private level: logLevel | undefined
  private name: string | undefined
  // private chalk: ChalkInstance = new Chalk()
  constructor(options: LoggerOptions) {
    this.name = options.name
    this.level = options.level
  }

  logToConsole(level: logLevel, message: string) {
    if (!this.level) {
      this.level = 'info'
    }

    switch (level) {
      case 'critical':
        console.log(
          `${loggerColors.critical}[${this.name}] | [CRITICAL] | ${loggerColors.message}${message}`
        )
        break
      case 'error':
        console.log(
          `${loggerColors.critical}[${this.name}] | [ERROR] | ${loggerColors.message}${message}`
        )
        break
      case 'warning':
        console.log(
          `${loggerColors.warning}[${this.name}] | [WARNING] | ${loggerColors.message}${message}`
        )
        break
      case 'success':
        console.log(
          `${loggerColors.success}[${this.name}] | [SUCCESS] | ${loggerColors.message}${message}`
        )
        break
      case 'info':
        console.log(
          `${loggerColors.info}[${this.name}] | [INFO] | ${loggerColors.message}${message}`
        )
        break
      case 'debug':
        console.log(
          `${loggerColors.debug}[${this.name}] | [DEBUG] | ${loggerColors.message}${message}`
        )
        break
      case 'trace':
        console.log(
          `${loggerColors.trace}[${this.name}] | [TRACE] | ${loggerColors.message}${message}`
        )
        break
    }
  }

  // logToFile(level: logLevel, message: string) {}

  // logToElastic(level: logLevel, message: string) {}

  private log(level: logLevel, message: string) {
    if (!this.level) {
      this.level = 'info'
    }

    switch (level) {
      case 'critical':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
      case 'error':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
      case 'warning':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
      case 'success':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
      case 'info':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
      case 'debug':
        this.logToConsole(level, message)
        // this.logToFile(level, message)
        // this.logToElastic(level, message)
        break
    }
  }

  public critical(message: string) {
    this.log('critical', message)
  }

  public error(message: string) {
    this.log('error', message)
  }

  public warning(message: string) {
    this.log('warning', message)
  }

  public success(message: string) {
    this.log('success', message)
  }

  public info(message: string) {
    this.log('info', message)
  }

  public debug(message: string) {
    this.log('debug', message)
  }
}
