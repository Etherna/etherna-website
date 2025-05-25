import { deploy } from "@/server/actions/deploy"

import type { GlobalAfterChangeHook } from "payload"

export const globalTriggerDeploy: GlobalAfterChangeHook = async (args) => {
  // draft -> draft should not trigger redeploy
  if (args.doc._status === "draft" && args.previousDoc?._status === "draft") {
    return
  }

  // both draft -> published and published -> draft shoudl trigger redeploy
  await deploy()
}
