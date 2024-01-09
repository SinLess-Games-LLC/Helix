import { Priority } from './priority.enum'
import { BaseComponent } from './base.component'

async function fetchDiscordBotStatus() {
  const res = await fetch('http://localhost:8001/api/v1/health')
  return await res.json()
}

export const createDiscordBotComponent = async () => {
  const discordBotStatus = await fetchDiscordBotStatus()

  const DiscordBotComponent: BaseComponent = {
    id: 'discord-bot',
    priority: Priority.MissionCritical,
    name: 'Discord Bot',
    description:
      'Discord Bot is a proprietary freeware instant messaging and VoIP application and digital distribution platform designed for creating communities ranging from gamers to education and businesses.',
    status: discordBotStatus.status.description,
    position: 4,
  }

  return DiscordBotComponent
}
