"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { formatDistance, formatDuration, intervalToDuration } from "date-fns"

import { CalendarIcon, TimerIcon } from "lucide-react"

import type { DeployRun } from "@/lib/deploy"

interface DeployCardProps extends React.ComponentProps<"div"> {
  run: DeployRun
  isActiveState?: boolean
}

export function DeployCard({ className, children, run, isActiveState, ...props }: DeployCardProps) {
  const router = useRouter()
  const intervalRef = useRef<NodeJS.Timeout>(undefined)
  const abortControllerRef = useRef(new AbortController())

  const isPending = ["queued", "in_progress", "pending"].includes(run.status ?? "")
  const status = (() => {
    switch (run.conclusion) {
      case "success":
        return "success"
      case "failure":
        return "error"
      default:
        return "elevation"
    }
  })()

  const stop = () => {
    clearInterval(intervalRef.current)
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
  }

  useEffect(() => {
    async function fetchWorkflow() {
      const response = await fetch(`/api/fetch-workflow?run_id=${run.id}`, {
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        stop()
        return
      }

      const data = (await response.json()) as DeployRun

      if (run.status !== data.status) {
        stop()
        router.refresh()
      }
    }

    if (run.status === "in_progress") {
      intervalRef.current = setInterval(() => {
        fetchWorkflow()
      }, 2000)
    }

    return () => {
      stop()
    }
  })

  return (
    <div className={`card card-posts card--has-onclick ${className}`} {...props}>
      <div className="">
        <h3 className="card__title mb-2">
          {
            {
              success: "Success",
              error: "Failure",
              elevation: run.conclusion || run.status,
            }[status]
          }
        </h3>
        <p className="flex items-center gap-1 text-sm">
          <CalendarIcon className="size-3" />
          {formatDistance(new Date(run.created_at), new Date(), { addSuffix: true })}
        </p>
        <p className="flex items-center gap-1 text-sm">
          <TimerIcon className="size-3" />
          {formatDuration(
            intervalToDuration({
              start: new Date(run.run_started_at ?? run.created_at),
              end: new Date(run.updated_at),
            }),
            { format: ["minutes", "seconds"] },
          )}
        </p>
        {isActiveState && <p className="text-sm text-green-500">current state</p>}
      </div>
      <div className="card__actions">
        {isPending ? (
          <div className="flex size-4 animate-spin items-center justify-center rounded-full border border-dashed border-amber-500">
            <div className="m-auto size-2.5 animate-pulse rounded-full bg-amber-500" />
          </div>
        ) : (
          <div
            className={`size-3 rounded-full card__status--${run.status}`}
            style={{
              backgroundColor: `var(--theme-${status}-550)`,
            }}
          />
        )}
      </div>

      {children}

      <a
        className="btn card__click btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-none btn--withoutPopup"
        href={run.html_url}
        target="_blank"
      >
        <span className="btn__content"></span>
      </a>
    </div>
  )
}
