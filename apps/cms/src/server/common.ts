import { Octokit } from "@octokit/rest"

import { env } from "@/env"

export const github = new Octokit({
  auth: env.GITHUB_TOKEN,
})
export const owner = "etherna"
export const repo = "etherna-website"
