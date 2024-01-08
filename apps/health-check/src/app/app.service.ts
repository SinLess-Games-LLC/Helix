import {
  Injectable,
  // Logger
} from '@nestjs/common'
import { cloudflareStatusUrl, discordStatusUrl } from '@helix/helix-utilities'

export interface Response {
  id: string
  name: string
  time: {
    raw: number
    formatted: string
  }
  status: string
  components: {
    id: string
    /**
     * Priority of the component
     *
     * 1 = Mission Critical
     * 2 = High
     * 3 = Elevated
     * 4 = Minor
     * 5 = Maintenance | Subsystem
     */
    priority: 1 | 2 | 3 | 4 | 5
    name: string
    status: string
    position: number
  }[]
}

export interface StatusResponse {
  page: {
    id: string
    name: string
    url: string
    time_zone: string
    updated_at: string
  }
  status: {
    indicator: string
    description: string
  }
}

@Injectable()
export class AppService {
  // private logger = new Logger('AppService')
  constructor() {}

  async fetchDiscordStatus(): Promise<StatusResponse> {
    return fetch(discordStatusUrl)
      .then(res => res.json())
      .then(res => {
        return res
      })
  }

  async fetchCloudflareStatus(): Promise<StatusResponse> {
    return fetch(cloudflareStatusUrl)
      .then(res => res.json())
      .then(res => {
        return res
      })
  }

  formatDate(timestamp: string | number | Date) {
    const date = new Date(timestamp)

    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Adding 1 because months are zero-based
    const day = ('0' + date.getDate()).slice(-2)
    const year = date.getFullYear()
    let hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const seconds = ('0' + date.getSeconds()).slice(-2)
    let period = 'AM'

    if (parseInt(hours) > 12) {
      hours = ('0' + (parseInt(hours) - 12)).slice(-2)
      period = 'PM'
    }

    if (hours === '00') {
      hours = '12'
    }

    return `[DATE] ${month}-${day}-${year} [TIME] ${hours}:${minutes}:${seconds} ${period}`
  }

  async getStatus(): Promise<Response> {
    const discordStatus: StatusResponse = await this.fetchDiscordStatus()
    const cloudflareStatus: StatusResponse = await this.fetchCloudflareStatus()

    return {
      id: 'health-check',
      name: 'Helix Health Check',
      time: {
        raw: Date.now(),
        formatted: this.formatDate(Date.now()),
      },
      status: 'operational',
      components: [
        {
          id: 'discord',
          priority: 3,
          name: 'Discord',
          status: discordStatus.status.description,
          position: 1,
        },
        {
          id: 'cloudflare',
          priority: 2,
          name: 'Cloudflare',
          status: cloudflareStatus.status.description,
          position: 2,
        },
      ],
    }
  }
}
