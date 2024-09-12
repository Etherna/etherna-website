import "server-only"

import { cache } from "react"

import { github, owner, repo } from "../common"
import { DEPLOY_WORKFLOW_ID } from "@/lib/const"

export const fetchDeploys = cache(async () => {
  const data = await github.actions.listWorkflowRuns({
    owner,
    repo,
    per_page: 10,
    workflow_id: DEPLOY_WORKFLOW_ID,
  })

  const runs = data.data.workflow_runs

  return runs
})

export type DeployRun = Awaited<ReturnType<typeof fetchDeploys>>[number]
