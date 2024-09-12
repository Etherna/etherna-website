import type { fetchDeploys } from "@/server/queries/fetch-deploys"

export function isActiveState(run: DeployRun, i: number, array: DeployRun[]) {
  return (
    (run.conclusion === "success" && array.findIndex((r) => r.conclusion === "success") === i) ||
    run.status === "in_progress"
  )
}

export function isOlderState(run: DeployRun, i: number, array: DeployRun[]) {
  return !isActiveState(run, i, array)
}

export type DeployRun = Awaited<ReturnType<typeof fetchDeploys>>[number]
