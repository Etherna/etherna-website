import { Suspense } from "react"

import { DeployButton } from "./deploy-button"
import { DeployCard } from "./deploy-card"
import { isActiveState, isOlderState } from "@/lib/deploy"
import { fetchDeploys } from "@/server/queries/fetch-deploys"

export function Deploys() {
  return (
    <div className="dashboard__group mb-10">
      <h2>Deploys</h2>

      <Suspense
        fallback={
          <>
            <div>
              <h3 className="mb-2">Active</h3>
              <Grid>
                <Skeleton className="h-[105px]" />
                <Skeleton className="h-[105px]" />
              </Grid>
            </div>

            <div>
              <h3 className="mb-2">Older deploys</h3>
              <Grid>
                <Loading />
              </Grid>
            </div>
          </>
        }
      >
        <DeploysContent />
      </Suspense>
    </div>
  )
}

async function DeploysContent() {
  const { runs, error } = await fetchDeploys()

  if (error) {
    return <DeploysUnavailable message={error} />
  }

  return (
    <>
      <div>
        <h3 className="mb-2">Active</h3>
        <Grid>
          {runs.filter(isActiveState).map((run, i) => (
            <DeployCard key={i} run={run} isActiveState={run.conclusion === "success"} />
          ))}

          <DeployButton className="card card-posts card--has-onclick" />
        </Grid>
      </div>

      <div>
        <h3 className="mb-2">Older deploys</h3>
        <Grid>{runs.filter(isOlderState).map((run, i) => <DeployCard key={i} run={run} />)}</Grid>
      </div>
    </>
  )
}

function DeploysUnavailable({ message }: { message: string }) {
  return (
    <div className="card card-posts">
      <p className="text-sm text-[var(--theme-elevation-500)]">{message}</p>
      <p className="mt-1 text-xs text-[var(--theme-elevation-400)]">
        The rest of the dashboard is unaffected. Deploy actions will be unavailable until GitHub is
        reachable.
      </p>
    </div>
  )
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
