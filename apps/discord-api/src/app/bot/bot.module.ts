import { Module } from '@nestjs/common'
import { DiscordModule } from '@discord-nestjs/core'
import { DiscordConfigService } from './discord-config.service'
import { BotGateway } from './bot.gateway'
import { AppService } from '../app.service'
import { PingCommand } from './commands/utility/ping.command'
import { BotInviteCommand } from './commands/utility/invite.command'
import { StatusCommand } from './commands/utility/status.command'

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
  ],
  controllers: [],
  providers: [
    BotGateway,
    AppService,
    /**
     * Commands
     */
    PingCommand,
    BotInviteCommand,
    StatusCommand,
  ],
})
export class BotModule {}
