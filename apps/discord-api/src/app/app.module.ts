import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TrpcModule } from '@helix/trpc'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HelixConfiguration } from '@helix/helix-utilities'
import entities from '@helix/entities'
import { BotModule } from './bot/bot.module'
import { DiscordModule } from './discord'
import { BotGateway } from './bot/bot.gateway'

const config = new HelixConfiguration()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.mysql.net.host,
      port: config.database.mysql.net.port,
      username: config.database.mysql.user.username,
      password: config.database.mysql.user.password,
      database: config.database.mysql.database.name,
      autoLoadEntities: true,
      synchronize: true,
      metadataTableName: 'helix-metadata',
      migrationsTableName: 'helix-migrations',
      cache: {
        type: 'database',
        tableName: 'helix-cache',
        options: {
          host: config.database.mysql.net.host,
          port: config.database.mysql.net.port,
          username: config.database.mysql.user.username,
          password: config.database.mysql.user.password,
          database: config.database.mysql.database.name,
          duration: 10000,
        },
      },
    }),
    DiscordModule.forFeature(),
    TypeOrmModule.forFeature(entities),
    TrpcModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService, BotGateway],
})
export class AppModule {}
