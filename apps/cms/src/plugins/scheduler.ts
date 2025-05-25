import { schedulerPlugin } from "plugins/scheduler"

import { deployIfNeeded } from "@/schedules/deploy-if-needed"

export const scheduler = schedulerPlugin({
  jobs: [
    {
      name: "triggerDeploy",
      // every minute
      cron: "*/1 * * * *",
      handler: deployIfNeeded({
        collections: ["pages", "posts"],
      }),
    },
  ],
})
