import { DEPLOY_WORKFLOW_ID } from "@/lib/const"
import { deploy } from "@/server/actions/deploy"
import { github, owner, repo } from "@/server/common"

import type { BasePayload, CollectionSlug } from "payload"

interface DeployIfNeededConfig {
  collections: CollectionSlug[]
  payload: BasePayload
}

// MAKE SURE THIS COICIDES WITH THE SCHEDULED JOB CRON IN `payload.config.ts`
const SCHEDULE_SECONDS = 60 // 1 minute

export const deployIfNeeded = async ({ collections, payload }: DeployIfNeededConfig) => {
  if (process.env.NODE_ENV !== "production") {
    payload.logger.info("Skipping deploy check in non-production environment")
    return
  }

  const data = await github.actions
    .listWorkflowRuns({
      owner,
      repo,
      per_page: 20, // just to be sure
      workflow_id: DEPLOY_WORKFLOW_ID,
    })
    .catch(() => null)

  const lastDeploy = data?.data.workflow_runs.find((run) => {
    if (run.conclusion === "success") {
      return true
    }
    if (["queued", "in_progress", "requested"].includes(run.status ?? "")) {
      return true
    }
    return false
  })
  const lastRunDate = lastDeploy
    ? new Date(lastDeploy.created_at)
    : new Date(Date.now() - SCHEDULE_SECONDS * 1000)

  const results = await Promise.all(
    collections.map((collection) => {
      return payload.find({
        collection,
        where: {
          and: [
            {
              publishedAt: {
                greater_than_equal: lastRunDate.toISOString(),
              },
            },
            {
              publishedAt: {
                less_than_equal: new Date().toISOString(),
              },
            },
          ],
        },
      })
    }),
  )

  const hasPublishableContent = results.some((res) => res.totalDocs > 0)

  if (hasPublishableContent) {
    payload.logger.info("Deploying due to new content")

    await deploy()
  }

  return {
    output: {
      success: hasPublishableContent,
    },
  }
}
