import { github, owner, repo } from "../common"
import { DEPLOY_WORKFLOW_ID } from "@/lib/const"

import type { Endpoint } from "payload"

export const runDeploy: Endpoint = {
  method: "post",
  path: "/run-deploy",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const last = await github.actions
      .listWorkflowRunsForRepo({
        owner,
        repo,
        per_page: 1,
      })
      .then((res) => res.data.workflow_runs[0])

    if (last?.status && ["requested", "queued", "pending", "waiting"].includes(last.status)) {
      return new Response(JSON.stringify(last), { status: 200 })
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

    return new Response(JSON.stringify(newRun.data), { status: 200 })
  },
}
