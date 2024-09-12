"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"

import { RefreshCcwDotIcon } from "lucide-react"

export function DeployButton({ className, children }: React.ComponentProps<"button">) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const triggerDeploy = async () => {
    const response = await fetch("/api/run-deploy", { method: "POST" })

    if (!response.ok) {
      throw new Error("Failed to trigger deploy")
    }

    return true
  }

  const submit = () => {
    startTransition(() => {
      triggerDeploy()
        .then(() => {
          router.refresh()
        })
        .catch(() => {
          alert("Failed to trigger deploy")
        })
    })
  }

  return (
    <button className={`${className}`} onClick={submit} disabled={isPending}>
      {children ?? (
        <div className="m-auto flex flex-col items-center gap-2">
          <RefreshCcwDotIcon className={`size-6 ${isPending ? "animate-spin" : ""}`} />
          <span>Redeploy</span>
        </div>
      )}
    </button>
  )
}
