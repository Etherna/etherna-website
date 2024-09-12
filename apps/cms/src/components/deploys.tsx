import { Suspense } from "react"

import { DeployButton } from "./deploy-button"
import { DeployCard } from "./deploy-card"
import { isActiveState, isOlderState } from "@/lib/deploy"
import { fetchDeploys } from "@/server/queries/fetch-deploys"

export function Deploys() {
  return (
    <div className="dashboard__group mb-10">
      <h2>Deploys</h2>

      <div>
        <h3 className="mb-2">Active</h3>
        <Grid>
          <Suspense
            fallback={
              <>
                <Skeleton className="h-[105px]" />
                <Skeleton className="h-[105px]" />
              </>
            }
          >
            <CurrentDeploy />
          </Suspense>
        </Grid>
      </div>

      <div>
        <h3 className="mb-2">Older deploys</h3>
        <Grid>
          <Suspense fallback={<Loading />}>
            <DeploysList />
          </Suspense>
        </Grid>
      </div>
    </div>
  )
}

async function CurrentDeploy() {
  const runs = await fetchDeploys()

  return (
    <>
      {runs.filter(isActiveState).map((run, i) => (
        <DeployCard key={i} run={run} isActiveState={run.conclusion === "success"} />
      ))}

      <DeployButton className="card card-posts card--has-onclick" />
    </>
  )
}

async function DeploysList() {
  const runs = await fetchDeploys()

  return runs.filter(isOlderState).map((run, i) => <DeployCard key={i} run={run} />)
}

function Grid({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={`dashboard__card-list ${className}`} {...props}>
      {children}
    </div>
  )
}

function Loading() {
  return (
    <>
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
      <Skeleton className="h-[89px]" />
    </>
  )
}

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`h-20 w-full animate-pulse rounded bg-[var(--theme-elevation-50)] ${className}`}
      {...props}
    />
  )
}
