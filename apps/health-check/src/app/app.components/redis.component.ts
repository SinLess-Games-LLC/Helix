import { Priority } from './priority.enum'
import { BaseComponent } from './base.component'
import Redis from 'ioredis'

async function fetchRedisStatus() {
  const redis = new Redis({
    host: 'localhost',
    port: 6379,
  })

  try {
    // Execute a command to check the Redis server status
    await redis.ping()

    // If the ping is successful, the Redis server is reachable
    return 'Operational'
  } catch (error) {
    // If an error occurs, the Redis server is unreachable
    return 'Down'
  } finally {
    // Close the Redis connection
    redis.disconnect()
  }
}

export const createRedisComponent = async (position: number) => {
  const component: BaseComponent = {
    id: 'redis',
    priority: Priority.High,
    name: 'Redis',
    description:
      'The Redis database used for caching and other data storage in the Helix ecosystem.',
    status: await fetchRedisStatus(),
    position: position,
  }

  return component
}
