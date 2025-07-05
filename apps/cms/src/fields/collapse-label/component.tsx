"use client"

import { useLocale, useRowLabel } from "@payloadcms/ui"

import type { CollapsibleFieldClientProps } from "payload"

interface CollapseLabelProps extends CollapsibleFieldClientProps {
  /** Pattern: "{variant}: {title}" */
  useAsTitle: string
}

export default function CollapseLabel({ useAsTitle, field }: CollapseLabelProps) {
  const data = useRowLabel()
  const locale = useLocale()

  const defaultLabel = typeof field.label === "string" ? field.label : field.label[locale.code]

  const label =
    useAsTitle.replace(/{(.*?)}/g, (_, p1) => {
      const fieldPath = (p1 as string).split(".")
      return getFieldValue(fieldPath, data.data) ?? ""
    }) || defaultLabel

  return <div>{label}</div>
}

function getFieldValue(fieldPath: string[], data: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  return fieldPath.reduce<any>((acc, key) => acc?.[key], data) as string | undefined
}
