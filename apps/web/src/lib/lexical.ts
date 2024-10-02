import type { CodeBlock as CodeBlockProps } from "@payload-types"
import type { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical"

export type NodeType = DefaultNodeTypes | SerializedBlockNode<CodeBlockProps>

export interface LexicalRichText {
  root: {
    children: {
      [k: string]: unknown
      type: string
      version: number
    }[]
  }
}

export function isEmptyLexical(
  content: LexicalRichText | null | undefined,
): content is LexicalRichText {
  return (content?.root.children.length ?? 0) === 0
}
