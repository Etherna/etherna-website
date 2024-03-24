import type { RestEndpointMethodTypes } from "@octokit/rest"

export type GitHubWorkflowRun =
  RestEndpointMethodTypes["actions"]["listWorkflowRunsForRepo"]["response"]["data"]["workflow_runs"][0]
