import { Priority } from './priority.enum'
import { BaseComponent } from './base.component'

async function fetchMySQLStatus() {
  return fetch(`http://localhost:${process.env.PORT || 8002}/api/v1/health/database/status`)
    .then(response => response.json())
    .then(json => json.database)
}

export const createMySQLComponent = async (position: number) => {
  const component: BaseComponent = {
    id: 'mysql',
    priority: Priority.MissionCritical,
    name: 'MySQL',
    description: 'The MySQL database that stores all of the data for the Helix ecosystem.',
    status: await fetchMySQLStatus(),
    position: position,
  }

  return component
}
