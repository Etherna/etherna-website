"use client"

import { useEffect } from "react"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import {
  createClientFeature,
  useEditorConfigContext,
} from "@payloadcms/richtext-lexical/client"
import { $convertFromMarkdownString } from "@payloadcms/richtext-lexical/lexical/markdown"
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless"
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isParagraphNode,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  PASTE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical"

import { looksLikeMarkdown } from "./looks-like-markdown"

import type { Transformer } from "@payloadcms/richtext-lexical/lexical/markdown"
import type {
  Klass,
  LexicalEditor,
  LexicalNode,
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical"

type RegisteredNodesMap = Map<string, { klass: Klass<LexicalNode> }>

function getEditorRegisteredNodes(editor: LexicalEditor): RegisteredNodesMap {
  return (editor as LexicalEditor & { _nodes: RegisteredNodesMap })._nodes
}

function getRegisteredNodeClasses(editor: LexicalEditor): Array<Klass<LexicalNode>> {
  const classes = new Set<Klass<LexicalNode>>()

  for (const { klass } of getEditorRegisteredNodes(editor).values()) {
    classes.add(klass)
  }

  return Array.from(classes)
}

function $parseSerializedNodeFromEditor(
  editor: LexicalEditor,
  serialized: SerializedLexicalNode,
): LexicalNode {
  const registeredNode = getEditorRegisteredNodes(editor).get(serialized.type)

  if (!registeredNode) {
    throw new Error(`Unknown node type: ${serialized.type}`)
  }

  const node = registeredNode.klass.importJSON(serialized)

  if (
    $isElementNode(node) &&
    node.getChildrenSize() === 0 &&
    "children" in serialized &&
    Array.isArray(serialized.children)
  ) {
    for (const child of (serialized as SerializedElementNode).children) {
      node.append($parseSerializedNodeFromEditor(editor, child))
    }
  }

  return node
}

function $isEditorEmpty(): boolean {
  const root = $getRoot()
  const children = root.getChildren()

  if (children.length === 0) {
    return true
  }

  return children.every(
    (child) => $isParagraphNode(child) && child.getTextContent().trim() === "",
  )
}

function convertMarkdownToSerializedState(
  editor: LexicalEditor,
  markdown: string,
  transformers: Transformer[],
): SerializedEditorState {
  const headlessEditor = createHeadlessEditor({
    namespace: "MarkdownPaste",
    nodes: getRegisteredNodeClasses(editor),
    onError: (error) => {
      console.error("Markdown paste conversion failed:", error)
    },
  })

  headlessEditor.update(
    () => {
      $convertFromMarkdownString(markdown, transformers)
    },
    { discrete: true },
  )

  return headlessEditor.getEditorState().toJSON()
}

function $insertParsedMarkdown(
  editor: LexicalEditor,
  serializedState: SerializedEditorState,
): void {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return
  }

  if (!selection.isCollapsed()) {
    selection.removeText()
  }

  const blockNodes = serializedState.root.children ?? []
  const importedNodes = blockNodes.map((json) => $parseSerializedNodeFromEditor(editor, json))

  if (importedNodes.length === 0) {
    return
  }

  selection.insertNodes(importedNodes)

  importedNodes[importedNodes.length - 1]?.selectEnd()
}

function MarkdownPastePlugin() {
  const [editor] = useLexicalComposerContext()
  const { editorConfig } = useEditorConfigContext()
  const transformers = editorConfig.features.markdownTransformers ?? []

  useEffect(() => {
    if (!transformers.length) {
      return
    }

    return mergeRegister(
      editor.registerCommand(
        PASTE_COMMAND,
        (event: ClipboardEvent) => {
          if (!(event instanceof ClipboardEvent) || event.clipboardData == null) {
            return false
          }

          const clipboardData = event.clipboardData

          if (clipboardData.files.length > 0) {
            return false
          }

          const html = clipboardData.getData("text/html").trim()

          if (html) {
            return false
          }

          const markdown = clipboardData.getData("text/plain")

          if (!looksLikeMarkdown(markdown)) {
            return false
          }

          event.preventDefault()

          try {
            const serializedState = convertMarkdownToSerializedState(
              editor,
              markdown,
              transformers,
            )

            const isEmpty = editor.getEditorState().read($isEditorEmpty)

            if (isEmpty) {
              editor.setEditorState(editor.parseEditorState(serializedState))
              return true
            }

            editor.update(() => {
              $insertParsedMarkdown(editor, serializedState)
            })
          } catch (error) {
            console.error("Failed to paste markdown:", error)
          }

          return true
        },
        COMMAND_PRIORITY_NORMAL,
      ),
    )
  }, [editor, transformers])

  return null
}

export const MarkdownPasteFeatureClient = createClientFeature({
  plugins: [
    {
      Component: MarkdownPastePlugin,
      position: "normal",
    },
  ],
})
