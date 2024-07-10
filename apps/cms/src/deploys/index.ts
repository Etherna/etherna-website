import { defineEndpoint } from "@directus/extensions"
import { Octokit } from "@octokit/rest"

export default defineEndpoint({
  id: "deploys",
  handler(router, context) {
    const github = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const owner = "etherna"
    const repo = "etherna-website"

    router.get("/", async (req, res) => {
      try {
        const data = await github.actions.listWorkflowRunsForRepo({
          owner,
          repo,
          per_page: 20,
        })

        const runs = data.data.workflow_runs

        res.json(runs)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.post("/", async (req, res) => {
      try {
        const last = await github.actions
          .listWorkflowRunsForRepo({
            owner,
            repo,
            per_page: 1,
          })
          .then((res) => res.data.workflow_runs[0])

        if (last?.status && ["requested", "queued", "pending", "waiting"].includes(last.status)) {
          return res.status(200).json(last)
        }

        if (last?.status === "in_progress") {
          await github.actions.cancelWorkflowRun({
            owner,
            repo,
            run_id: last.id,
          })
          const run = await github.actions.reRunWorkflow({
            owner,
            repo,
            run_id: last.id,
          })
          return res.status(200).json(run.data)
        } else {
          const newRun = await github.actions.createWorkflowDispatch({
            owner,
            repo,
            workflow_id: "deploy.yml",
            ref: "main",
          })
          return res.status(200).json(newRun.data)
        }
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.get("/:id", async (req, res) => {
      try {
        const data = await github.actions.getWorkflowRun({
          owner,
          repo,
          run_id: Number(req.params.id),
        })

        res.json(data.data)
      } catch (error) {
        res.status(500).json({ error })
      }
    })
  },
})
