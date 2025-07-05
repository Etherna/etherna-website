import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
} from "@payloadcms/richtext-lexical/lexical"
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless"

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

const lexicalEditor = createHeadlessEditor({
  namespace: "Editor",
  nodes: [],
  onError: console.error,
})

export async function plainTextToLexicalState(text: string) {
  return new Promise<SerializedEditorState>((resolve) => {
    lexicalEditor.registerUpdateListener(({ editorState }) => {
      resolve(editorState.toJSON())
    })

    lexicalEditor.update(() => {
      const paragraph = $createParagraphNode()
      const textNode = $createTextNode(text)

      paragraph.append(textNode)

      $getRoot().clear().append(paragraph)
    })
  })
}
