import type { CodeBlock as CodeBlockProps } from "@payload-types"
import type { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical"

export type NodeType = DefaultNodeTypes | SerializedBlockNode<CodeBlockProps>
