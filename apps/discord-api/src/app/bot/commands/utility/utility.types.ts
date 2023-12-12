export interface Component {
  id: string
  name: string
  status: string
  created_at: string
  updated_at: string
  position: number
  description: string | null
  showcase: boolean
  start_date: string | null
  group_id: string | null
  page_id: string
  group: boolean
  only_show_if_degraded: boolean
  components?: string[] // Recursive reference to handle nested components
}

export interface Page {
  id: string
  name: string
  url: string
  time_zone: string
  updated_at: string
}

export interface Status {
  indicator: string
  description: string
}

export interface DiscordStatus {
  page: Page
  components: Component[]
  incidents: any[] // Replace with the appropriate type for incidents
  scheduled_maintenances: any[] // Replace with the appropriate type for scheduled maintenances
  status: Status
}
