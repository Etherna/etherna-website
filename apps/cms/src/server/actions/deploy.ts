import { github, owner, repo } from "../common"
import { env } from "@/env"
import { DEPLOY_WORKFLOW_ID } from "@/lib/const"

export async function deploy() {
  if (env.NODE_ENV !== "production") {
    console.info("Skipping deploy in development")
    return
  }

  const last = await github.actions
    .listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: 1,
    })
    .then((res) => res.data.workflow_runs[0])

  if (last?.status && ["requested", "queued", "pending", "waiting"].includes(last.status)) {
    return last
  }

  if (last?.status === "in_progress") {
    await github.actions.cancelWorkflowRun({
      owner,
      repo,
      run_id: last.id,
    })
    await github.actions.deleteWorkflowRun({
      owner,
      repo,
      run_id: last.id,
    })
  }

  const newRun = await github.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: DEPLOY_WORKFLOW_ID,
    ref: "main",
  })

  return newRun.data
}
