"use client"

export function ColorCell(props: any) {
  return (
    <div
      className="size-6 rounded"
      style={{
        backgroundColor: props.cellData,
      }}
    />
  )
}
