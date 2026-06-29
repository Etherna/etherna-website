import "server-only"

import { cache } from "react"

import { github, owner, repo } from "../common"
import { DEPLOY_WORKFLOW_ID } from "@/lib/const"

export type FetchDeploysResult = {
  runs: Awaited<ReturnType<typeof github.actions.listWorkflowRuns>>["data"]["workflow_runs"]
  error: string | null
}

function getFetchDeploysErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status?: number }).status

    if (status === 401 || status === 403) {
      return "Unable to load deploys. Check that GITHUB_TOKEN has actions:read access."
    }

    if (status === 404) {
      return "Deploy workflow not found in the repository."
    }
  }

  return "Unable to load deploy history from GitHub."
}

export const fetchDeploys = cache(async (): Promise<FetchDeploysResult> => {
  try {
    const data = await github.actions.listWorkflowRuns({
      owner,
      repo,
      per_page: 10,
      workflow_id: DEPLOY_WORKFLOW_ID,
    })

    return { runs: data.data.workflow_runs, error: null }
  } catch (error) {
    console.error("Failed to fetch deploys:", error)

    return { runs: [], error: getFetchDeploysErrorMessage(error) }
  }
})
