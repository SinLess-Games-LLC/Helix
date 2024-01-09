import { BaseComponent } from './base.component'
import { createDiscordComponent } from './discord.component'
import { createCloudflareComponent } from './cloudflare.component'
import { createDiscordBotComponent } from './discord.bot.component'
import { createMySQLComponent } from './mysql.component'
import { createGatewayApiComponent } from './gateway.api.component'

const initializeComponents = async (): Promise<BaseComponent[]> => {
  const discordComponent = await createDiscordComponent()
  const cloudflareComponent = await createCloudflareComponent()
  const mysqlComponent = await createMySQLComponent()
  const gatewayApiComponent = await createGatewayApiComponent()

  const discordBotComponent = await createDiscordBotComponent()

  return [
    discordComponent,
    cloudflareComponent,
    mysqlComponent,
    discordBotComponent,
    gatewayApiComponent,
  ]
}

export default initializeComponents
