import axios from 'axios'
import { MinimalStatusResponse, StatusResponse } from '../typings/bot.types'
import {
  cloudflareStatusSummaryUrl,
  discordStatusSummaryUrl,
  discordStatusUrl,
  // requiredDiscordComponents,
} from './bot.constants'
import { HelixLogger } from '@helix/helix-utilities'

const logger = new HelixLogger({ name: 'api.functions' })

export async function fetchDiscordStatusSummary() {
  try {
    const dss = await axios.get(discordStatusSummaryUrl)
    const discordStatusSummary: StatusResponse = dss.data
    return discordStatusSummary
  } catch (err: unknown) {
    logger.critical('Failed to fetch Discord Status Summary')
    logger.error(err as string)
  }
}

export async function fetchDiscordStatus() {
  try {
    const ds = await axios.get(discordStatusUrl)
    const discordStatus: MinimalStatusResponse = ds.data
    return discordStatus
  } catch (err: unknown) {
    logger.critical('Failed to fetch Discord Status')
    logger.error(err as string)
  }
}

export async function fetchCloudflareStatusSummary() {
  try {
    const cfss = await axios.get(cloudflareStatusSummaryUrl)
    const cloudflareStatusSummary: StatusResponse = cfss.data
    return cloudflareStatusSummary
  } catch (err: unknown) {
    logger.critical('Failed to fetch Cloudflare Status Summary')
    logger.error(err as string)
  }
}

function statusCompare(description: string) {
  if (description === 'All Systems Operational') {
    return 'Online'
  } else if (description === 'Partial System Outage') {
    return 'Partial System Outage'
  } else if (description === 'Minor Service Outage') {
    return 'Minor Service Outage'
  } else if (description === 'Major Service Outage') {
    return 'Major Service Outage'
  } else if (description === 'Degraded Performance') {
    return 'Degraded Performance'
  } else {
    return 'unknown'
  }
}

// compare discord status to status summary
export async function discordStatus() {
  // const discordStatusSummary = await fetchDiscordStatusSummary()
  const discordStatus = await fetchDiscordStatus()
  // const componentsToCheck = requiredDiscordComponents
  // const components = discordStatusSummary.components

  // const discordStatuses = components.filter(component => componentsToCheck.includes(component.name))

  return statusCompare(discordStatus.status.description)
}

export async function cloudflareStatus() {
  const cloudflareStatusSummary = await fetchCloudflareStatusSummary()

  return statusCompare(cloudflareStatusSummary.status.description)
}
