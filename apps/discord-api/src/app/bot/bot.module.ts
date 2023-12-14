import { Module } from '@nestjs/common'
import { DiscordModule } from '../discord'
import { DiscordConfigService } from './discord-config.service'
import { BotGateway } from './bot.gateway'
import { AppService } from '../app.service'
import { PingCommand } from './commands/utility/ping.command'
import { BotInviteCommand } from './commands/utility/invite.command'
import { StatusCommand } from './commands/utility/status.command'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DiscordGuild, DiscordUser } from '@helix/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscordGuild, DiscordUser]),
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
