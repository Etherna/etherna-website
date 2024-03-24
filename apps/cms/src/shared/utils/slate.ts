import { SlateDescendant } from "@mattiaz9/slate-jsx"
import { BaseEditor } from "slate"

export function setInitialContent(
  editor: BaseEditor | null,
  content: SlateDescendant[],
  emptyValue: SlateDescendant[],
) {
  if (!editor) return

  const newValue = content ?? emptyValue

  const parsedValue = JSON.parse(JSON.stringify(newValue))
  const isSlateValue = Array.isArray(parsedValue) && parsedValue.length > 0

  if (!isSlateValue) return

  const isEmptyEditor =
    JSON.stringify(editor.children) === JSON.stringify(emptyValue)
  const isClearingValue =
    JSON.stringify(parsedValue) === JSON.stringify(emptyValue)
  const isNewContent =
    JSON.stringify(parsedValue) !== JSON.stringify(editor.children)

  if ((isEmptyEditor && isNewContent) || isClearingValue) {
    replaceEditorContent(editor, parsedValue)
  }
}

export function replaceEditorContent(
  editor: BaseEditor | null,
  newContent: SlateDescendant[],
) {
  if (!editor) return

  editor.children = newContent
  editor.onChange({
    operation: {
      type: "insert_text",
      text: "",
      offset: 0,
      path: [0, 0],
    },
  })
}
