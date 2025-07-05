import { deploy } from "@/server/actions/deploy"

import type { CollectionAfterChangeHook } from "payload"

export const triggerDeploy: CollectionAfterChangeHook = ({ collection, doc, previousDoc, req }) => {
  // draft -> draft should not trigger redeploy
  if (doc._status === "draft" && previousDoc?._status === "draft") {
    return
  }

  req.payload.logger.info(`Triggering deploy for collection "${collection.slug}"`)

  // both draft -> published and published -> draft shoudl trigger redeploy
  deploy()
}
