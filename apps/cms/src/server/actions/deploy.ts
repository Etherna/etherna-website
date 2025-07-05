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
    // not started yet, so there is no need to cancel
    return last
  }

  if (last?.status === "in_progress") {
    const jobs = await github.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id: last.id,
    })

    const isPublishInProgress = jobs.data.jobs.some(
      (job) => job.name === "Publish" && job.status === "in_progress",
    )

    if (!isPublishInProgress) {
      // only stop during build to avoid site downtime
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
  }

  const newRun = await github.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: DEPLOY_WORKFLOW_ID,
    ref: "main",
  })

  return newRun.data
}
