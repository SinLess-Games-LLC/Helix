import { Injectable, Logger } from '@nestjs/common'
import { Priority } from './app.components/priority.enum'
import initializeComponents from './app.components'

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
    priority: Priority
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
  private logger = new Logger('AppService')

  formatDate(timestamp: string | number | Date) {
    this.logger.log(`Formatting date: ${timestamp}`)
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

    const formattedDate = `[DATE] ${month}-${day}-${year} [TIME] ${hours}:${minutes}:${seconds} ${period}`
    this.logger.log(`Formatted date: ${formattedDate}`)

    return formattedDate
  }

  async fetchSystemStatus() {
    return 'Operational'
  }

  async getStatus(): Promise<Response> {
    const systemStatus: string = await this.fetchSystemStatus()
    const components = await initializeComponents()

    return {
      id: 'health-check',
      name: 'Helix Health Check',
      time: {
        raw: Date.now(),
        formatted: this.formatDate(Date.now()),
      },
      status: systemStatus,
      components: components,
    }
  }
}
