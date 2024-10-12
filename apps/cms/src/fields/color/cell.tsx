"use client"

import { useTableCell } from "@payloadcms/ui"

import type { CellComponentProps } from "payload"

export function ColorCell(_props: CellComponentProps) {
  const cell = useTableCell()

  return (
    <div
      className="size-6 rounded"
      style={{
        backgroundColor: cell.cellData,
      }}
    />
  )
}
