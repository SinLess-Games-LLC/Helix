import { CloudflareStatusUrl } from '@helix/helix-utilities'
import { StatusResponse } from '../app.service'
import { Priority } from './priority.enum'
import { BaseComponent } from './base.component'

async function fetchCloudflareStatus(): Promise<StatusResponse> {
  return fetch(CloudflareStatusUrl)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

export const createCloudflareComponent = async () => {
  const cloudflareStatus = await fetchCloudflareStatus()

  const CloudflareComponent: BaseComponent = {
    id: 'cloudflare',
    priority: Priority.High,
    name: 'Cloudflare',
    description:
      'Cloudflare, Inc. is an American web infrastructure and website security company that provides content delivery network services, DDoS mitigation, Internet security, and distributed domain name server services.',
    status: cloudflareStatus.status.description,
    position: 2,
  }

  return CloudflareComponent
}
