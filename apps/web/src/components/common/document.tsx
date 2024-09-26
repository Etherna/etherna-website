import { useTransition } from "react"

import { DownloadCloudIcon } from "lucide-react"

import { Spinner } from "../ui/spinner"
import { cn } from "@/utils/classnames"

import type { BundledFile } from "@/utils/bundle"

interface DocumentProps extends React.ComponentProps<"div"> {
  file?: BundledFile | null
}

export function Document({ className, file, ...props }: DocumentProps) {
  const [isPending, startTransition] = useTransition()

  const download = () => {
    startTransition(() => {
      if (!file) return

      const url = file?.url

      const a = document.createElement("a")
      a.href = url
      a.download = file?.filename ?? "unnamed"
      a.click()
    })
  }

  return (
    <div className={cn("bg-muted relative rounded p-4", className)} {...props}>
      <div className="flex-1">
        <div className="text-base font-semibold">{file?.filename}</div>
        <div className="text-muted-foreground text-sm">{file?.type}</div>
      </div>

      <button onClick={download}>
        {isPending ? <Spinner className="size-4" /> : <DownloadCloudIcon className="size-4" />}
      </button>
    </div>
  )
}
