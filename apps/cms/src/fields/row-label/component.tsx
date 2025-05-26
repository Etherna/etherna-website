"use client"

import { useRowLabel } from "@payloadcms/ui"

import type { RowLabelProps as PayloadRowLabelProps } from "@payloadcms/ui"

interface RowLabelProps extends PayloadRowLabelProps {
  useAsTitle: string
}

export default function RowLabel({ useAsTitle }: RowLabelProps) {
  const data = useRowLabel()
  const fieldPath = useAsTitle.split(".")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldValue = fieldPath.reduce((acc, key) => acc?.[key], data.data as any)

  const label = fieldValue
    ? fieldValue
    : `Item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}`

  return <div>{label}</div>
}
