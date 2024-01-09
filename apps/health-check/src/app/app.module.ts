import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TrpcModule } from '@helix/trpc'
import { TypeOrmModule } from '@nestjs/typeorm'
import { entities } from '@helix/entities'
import { HelixConfiguration } from '@helix/helix-utilities'
import { DatabaseModule } from './database/database.module'

const config = new HelixConfiguration()

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.mysql.net.host,
      port: config.database.mysql.net.port,
      username: config.database.mysql.user.username,
      password: config.database.mysql.user.password,
      database: config.database.mysql.database.name,
      autoLoadEntities: true,
      synchronize: true,
      cache: {
        duration: 30000, // 30 seconds
        tableName: 'helix-orm-cache',
      },
      metadataTableName: 'helix-orm-metadata',
    }),
    TypeOrmModule.forFeature(entities),
    TrpcModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
