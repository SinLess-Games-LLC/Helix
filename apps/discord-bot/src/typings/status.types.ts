interface Page {
  id: string
  name: string
  url: string
  time_zone: string
  updated_at: number
}

interface Component {
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
  components?: string[] // If it has nested components
}

export interface Status {
  indicator: string
  description: string
}

export interface StatusResponse {
  page: Page
  components: Component[]
  incidents: any[] // You might want to create a type for incidents as well
  scheduled_maintenances: any[] // Similarly, create a type for scheduled_maintenances
  status: Status
}

export interface MinimalStatusResponse {
  page: Page
  status: Status
}
