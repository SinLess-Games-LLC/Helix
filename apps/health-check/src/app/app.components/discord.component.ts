import { BaseComponent } from './base.component'
import { Priority } from './priority.enum'
import { StatusResponse } from '../app.service'
import { DiscordStatusUrl } from '@helix/helix-utilities'

async function fetchDiscordStatus(): Promise<StatusResponse> {
  const response = await fetch(DiscordStatusUrl)
  return await response.json()
}

export const createDiscordComponent = async () => {
  const discordStatus = await fetchDiscordStatus()

  const DiscordComponent: BaseComponent = {
    id: 'discord',
    priority: Priority.Elevated,
    name: 'Discord',
    description:
      'Discord is a proprietary freeware instant messaging and VoIP application and digital distribution platform designed for creating communities ranging from gamers to education and businesses.',
    status: discordStatus.status.description,
    position: 1,
  }

  return DiscordComponent
}
