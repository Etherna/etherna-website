import type { CodeBlock } from "@payload-types"

export function CodeBlock(props: CodeBlock) {
  return (
    <pre>
      <code>{props.code}</code>
    </pre>
  )
}
