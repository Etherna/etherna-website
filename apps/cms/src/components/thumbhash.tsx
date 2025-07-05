"use client"

import { Button, toast, useDocumentInfo, useField, useForm, useLocale } from "@payloadcms/ui"
import { thumbHashToAverageRGBA, thumbHashToDataURL } from "thumbhash"

import { RefreshCwIcon } from "lucide-react"

import type { TextFieldClientProps } from "payload"

export function Thumbhash({ path, field }: TextFieldClientProps) {
  const { label } = field
  const { value, setValue } = useField<string>({ path })
  const { id } = useDocumentInfo()
  const { code, fallbackLocale } = useLocale()
  const data = useForm()

  const mimeType = (data.getField("mimeType").value as string) ?? ""
  // const url = (data.getField("url").value as string) ?? ""
  // const width = (data.getField("width").value as number) ?? 100
  // const height = (data.getField("height").value as number) ?? 100

  const isImage = mimeType.startsWith("image/") && !mimeType.startsWith("image/svg")
  const thumbhash = value ? Buffer.from(value, "base64") : null
  const averageColor = thumbhash ? thumbHashToAverageRGBA(thumbhash) : null

  const refreshTumbhash = async () => {
    const resp = await fetch(`/api/thumbhash/${id}`, {
      method: "POST",
    })

    if (!resp.ok) {
      toast.error("Failed to generate thumbhash")
      return
    }

    const result = (await resp.json()) as { thumbhash: string }

    setValue(result.thumbhash)
  }

  if (!isImage) return null

  return (
    <div>
      <label className="field-label">
        {typeof label === "object" ? (label[code] ?? label[fallbackLocale ?? code]) : label}
      </label>
      <div className="flex flex-col gap-8 rounded border border-[var(--theme-border-color)] bg-[var(--theme-elevation-50)] md:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-auto max-h-[140px] w-[140px] shrink-0"
          src={thumbhash ? thumbHashToDataURL(thumbhash) : undefined}
          alt=""
          style={{
            backgroundColor: averageColor
              ? `rgba(${averageColor.r}, ${averageColor.g}, ${averageColor.b}, ${averageColor.a})`
              : undefined,
          }}
        />
        <code className="flex-1 p-5 font-mono text-lg font-semibold">{value}</code>
        <div className="flex shrink-0 items-center justify-center px-3">
          <Button onClick={refreshTumbhash} size="small">
            <RefreshCwIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
