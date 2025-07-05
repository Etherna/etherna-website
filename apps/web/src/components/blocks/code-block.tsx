import type { CodeBlock } from "@payload-types"

export function CodeBlock({ id, blockType, code, language }: CodeBlock) {
  return (
    <pre data-block={blockType} data-block-id={id}>
      <code>{code}</code>
    </pre>
  )
}
