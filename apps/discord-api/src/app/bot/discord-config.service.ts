/* discord-config.service.ts */

import { Injectable } from '@nestjs/common'
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core'
import { IntentsBitField } from 'discord.js'
import { HelixConfiguration } from '@helix/helix-utilities'

const config = new HelixConfiguration()

/**
 * Intents generated using online calculator
 * @see https://discord-intents-calculator.vercel.app/
 */
const intents = new IntentsBitField(3276799)

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: config.discord.bot.token,
      discordClientOptions: {
        intents: intents,
        shards: 'auto',
      },
      autoLogin: true,
      failOnLogin: true,
    }
  }
}
