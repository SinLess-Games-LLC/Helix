import { HelixLogger } from '@helix/helix-utilities'
import axios, {  AxiosResponse } from 'axios'
import { MinimalStatusResponse } from '../typings/status.types'

const logger = new HelixLogger({ name: 'api.functions' })

const CloudflareStatusUrl: string  = 'https://www.cloudflarestatus.com/api/v2/status.json'
const DiscordStatusUrl: string = 'https://discordstatus.com/api/v2/status.json'

export async function fetchDiscordStatus() {
  logger.info(`Fetching Discord Status`);

  let response: AxiosResponse<any, any>;

  try {
    logger.debug(`Fetching Discord Status from ${DiscordStatusUrl}`);
    response = await axios.get(DiscordStatusUrl);
    logger.info(`Discord Status fetched successfully`);
    return response.data;
  } catch (err) {
    logger.critical(`Failed to fetch Discord Status`);

    if (err.isAxiosError) {
      // Handle Axios errors
      if (err.errors) {
        // Log individual errors in case of AggregateError
        err.errors.forEach((error: unknown, index: number) => {
          logger.error(`Error ${index + 1}: ${error}`)
        });
      }
      logger.error(`Axios error: ${err.toString()}`);
    }

    else if (err.errors) {
      // Handle AggregateErrors
      err.errors.forEach((error: unknown, index: number) => {
        logger.error(`Error ${index + 1}: ${error.toString()}`);
      });
    }

    logger.error(err.toString());
  }
}

export async function fetchCloudflareStatus(): Promise<MinimalStatusResponse> {
  try {
    logger.info(`Fetching Cloudflare Status`);

    const response = await axios.get(CloudflareStatusUrl);
    const cfStatus = response.data;

    logger.info(`Cloudflare Status fetched successfully`);
    return cfStatus;
  } catch (err) {
    logger.critical(`Failed to fetch Cloudflare Status`);
    logger.error(err.toString());

    // Throw the error to propagate it further or handle it as needed
    throw err;
  }
}

function statusCompare(description: string) {
  if (description === 'All Systems Operational') {
    return 'All Systems Operational'
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

export function statusCompareToBoolean(description: string): boolean {
  switch (description) {
    case 'All Systems Operational':
      return true
    case 'Partial System Outage':
      return true
    case 'Minor Service Outage':
      return true
    case 'Major Service Outage':
    case 'Degraded Performance':
      return false
    default:
      return false
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
  const cloudflareStatus= await fetchCloudflareStatus()

  return statusCompare(cloudflareStatus.status.description)
}

export function status(status: boolean) {
  logger.debug(`Status: ${status}`)
  if (status) {
    return 'Operational'
  } else {
    return 'Down'
  }
}
