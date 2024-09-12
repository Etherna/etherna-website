import { github, owner, repo } from "../common"

import type { Endpoint } from "payload"

export const fetchWorkflow: Endpoint = {
  method: "get",
  path: "/fetch-workflow",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const runId = req.query.run_id as string | undefined

    if (!runId) {
      return new Response("Missing 'run_id' in the search query", { status: 400 })
    }

    const workflow = await github.actions.getWorkflowRun({
      owner,
      repo,
      run_id: parseInt(runId),
    })

    return new Response(JSON.stringify(workflow.data), { status: 200 })
  },
}
