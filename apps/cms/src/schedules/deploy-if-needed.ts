import { DEPLOY_WORKFLOW_ID } from "@/lib/const"
import { deploy } from "@/server/actions/deploy"
import { github, owner, repo } from "@/server/common"

import type { BasePayload, CollectionSlug } from "payload"

interface DeployIfNeededConfig {
  collections: CollectionSlug[]
}

export function deployIfNeeded(config: DeployIfNeededConfig) {
  return async (payload: BasePayload) => {
    if (process.env.NODE_ENV !== "production") {
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
    const lastRunDate = lastDeploy ? new Date(lastDeploy.created_at) : new Date(0)

    const collections = await Promise.all(
      config.collections.map((collection) => {
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

    const hasPublishableContent = collections.some((res) => res.totalDocs > 0)

    if (hasPublishableContent) {
      await deploy()
    }
  }
}
