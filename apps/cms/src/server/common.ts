import { Octokit } from "@octokit/rest"

export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})
export const owner = "etherna"
export const repo = "etherna-website"
