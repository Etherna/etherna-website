import { github, owner, repo } from "../common"
import { env } from "@/env"
import { DEPLOY_WORKFLOW_ID } from "@/lib/const"

async function getLastDeployRun() {
  const { data } = await github.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id: DEPLOY_WORKFLOW_ID,
    per_page: 1,
  })

  return data.workflow_runs[0]
}

async function waitForRunToComplete(runId: number, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    const { data } = await github.actions.getWorkflowRun({
      owner,
      repo,
      run_id: runId,
    })

    if (data.status === "completed") {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1_000))
  }
}

export async function deploy() {
  if (env.NODE_ENV !== "production") {
    console.info("Skipping deploy in development")
    return
  }

  const last = await getLastDeployRun()

  if (last?.status && ["requested", "queued", "pending", "waiting"].includes(last.status)) {
    // A deploy is already queued — no need to dispatch another.
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
      // Only stop during build to avoid site downtime.
      await github.actions.cancelWorkflowRun({
        owner,
        repo,
        run_id: last.id,
      })
      await waitForRunToComplete(last.id)
    }
  }

  await github.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: DEPLOY_WORKFLOW_ID,
    ref: "main",
  })

  return getLastDeployRun()
}
