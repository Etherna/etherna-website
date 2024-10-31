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

export function isEmptyLexical(content: LexicalRichText | null | undefined) {
  return (content?.root.children.length ?? 0) === 0
}

export function isNotEmptyLexical(
  content: LexicalRichText | null | undefined,
): content is LexicalRichText {
  return !isEmptyLexical(content)
}

export function stripLexicalTags(content: LexicalRichText | null | undefined) {
  const lines: string[] = []

  function walk(node: NodeType) {
    if (node.type === "text") {
      lines.push(node.text)
    } else if (node.type === "block") {
      if ("code" in node) {
        lines.push(node.code as string)
      }
    }

    if ("children" in node) {
      node.children?.forEach((node) => walk(node as NodeType))
    }
  }

  if (content) {
    content.root.children.forEach((node) => walk(node as NodeType))
  }

  return lines.join("\n")
}
