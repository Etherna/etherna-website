import { deploy } from "../actions/deploy"

import type { Endpoint } from "payload"

export const runDeploy: Endpoint = {
  method: "post",
  path: "/run-deploy",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const run = await deploy()

    return new Response(JSON.stringify(run), { status: 200 })
  },
}
