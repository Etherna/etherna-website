"use client"

import type { DefaultCellComponentProps } from "payload"

export function ColorCell(props: DefaultCellComponentProps) {
  return (
    <div
      className="size-6 rounded"
      style={{
        backgroundColor: props.cellData,
      }}
    />
  )
}
