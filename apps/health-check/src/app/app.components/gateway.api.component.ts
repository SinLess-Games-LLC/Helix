import { BaseComponent } from './base.component'
import { Priority } from './priority.enum'

async function getGatewayApiHealth() {
  return fetch(`http://localhost:8000/api/v1/health`)
    .then(response => response.json())
    .then(json => json.database)
}

export const createGatewayApiComponent = async (position: number) => {
  const component: BaseComponent = {
    id: 'gateway-api',
    priority: Priority.MissionCritical,
    name: 'Gateway API',
    description: 'The API that serves as the gateway to the Helix ecosystem.',
    status: await getGatewayApiHealth(),
    position: position,
  }

  return component
}
