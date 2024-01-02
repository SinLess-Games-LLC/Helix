type WaitFunction = (ms: number, value?: any) => Promise<ReturnType<typeof setTimeout>>
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const wait: WaitFunction = require('node:timers/promises').setTimeout
