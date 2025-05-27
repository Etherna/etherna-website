import { deploy } from "@/server/actions/deploy"

import type { GlobalAfterChangeHook } from "payload"

export const globalTriggerDeploy: GlobalAfterChangeHook = ({ req, global }) => {
  req.payload.logger.info(`Triggering deploy for global "${global.slug}"`)

  deploy()
}
