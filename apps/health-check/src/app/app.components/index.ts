import { BaseComponent } from './base.component'
import { createDiscordComponent } from './discord.component'
import { createCloudflareComponent } from './cloudflare.component'
import { createDiscordBotComponent } from './discord.bot.component'
import { createMySQLComponent } from './mysql.component'
import { createGatewayApiComponent } from './gateway.api.component'
import { createRedisComponent } from './redis.component'

const initializeComponents = async (): Promise<BaseComponent[]> => {
  const discordComponent = await createDiscordComponent(1)
  const cloudflareComponent = await createCloudflareComponent(2)
  const mysqlComponent = await createMySQLComponent(3)
  const redisComponent = await createRedisComponent(4)

  const discordBotComponent = await createDiscordBotComponent(5)
  const gatewayApiComponent = await createGatewayApiComponent(6)

  return [
    discordComponent,
    cloudflareComponent,
    mysqlComponent,
    redisComponent,
    discordBotComponent,
    gatewayApiComponent,
  ]
}

export default initializeComponents
