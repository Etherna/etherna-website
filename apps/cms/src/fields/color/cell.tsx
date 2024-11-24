"use client"

import type {} from "payload"

export function ColorCell(props: any) {
  console.log(props)

  return (
    <div
      className="size-6 rounded"
      style={{
        backgroundColor: props.cellData,
      }}
    />
  )
}
