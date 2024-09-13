import type { DefaultCellComponentProps } from "payload"

export function ColorCell(props: DefaultCellComponentProps) {
  console.log(props.cellData)
  return (
    <div
      className="size-6 rounded"
      style={{
        backgroundColor: "red",
      }}
    />
  )
}
