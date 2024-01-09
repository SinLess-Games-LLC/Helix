import { Priority } from './priority.enum'

export interface BaseComponent {
  id: string
  priority: Priority
  name: string
  description: string
  status: string
  position: number
}
