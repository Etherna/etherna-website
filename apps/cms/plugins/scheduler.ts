import { Job } from "node-schedule"
import { BasePayload, Config, Plugin } from "payload"

export interface SchedulerJob {
  name: string
  cron: string
  handler: (payload: BasePayload) => Promise<void> | void
}

export interface SchedulerPluginConfig {
  jobs: SchedulerJob[]
}

export const schedulerPlugin =
  (schedulerConfig: SchedulerPluginConfig): Plugin =>
  (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }

    config.onInit = async (payload) => {
      await incomingConfig.onInit?.(payload)

      for (const schedule of schedulerConfig.jobs) {
        const job = new Job(schedule.name, () => schedule.handler(payload))
        job.schedule(schedule.cron)
      }
    }

    return config
  }
