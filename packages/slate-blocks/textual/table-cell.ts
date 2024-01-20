import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Editor, Element, Point } from "slate"

import { vueJsxCompat } from "../utils/vue"
import { ListBlock } from "./list"
import { ParagraphBlock } from "./paragraph"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type TableCellType = inferBlockType<TableCellBlock<"th" | "td">>
export type TableCellElement = inferBlockElement<TableCellBlock<"th" | "td">>

export class TableCellBlock<Id extends "th" | "td"> extends SlateBlock<Id, {}> {
  protected _assert = (node: unknown) => {
    return (
      Element.isElement(node) &&
      "type" in node &&
      ["th", "td"].includes(node.type as string)
    )
  }

  constructor(id: Id) {
    super(id, {
      emptyBlock: {
        type: id,
        children: [new ParagraphBlock().emptyBlock],
      },
      allowedChildren: [
        ParagraphBlock.withId("p"),
        ListBlock.withId("ol"),
        ListBlock.withId("ul"),
      ],
      behaviours: [
        {
          trigger: "backspace",
          action: "stop",
          when: ({ editor, path }) => {
            if (!editor.selection) return false
            const start = Editor.start(editor, path)
            return (
              Point.equals(editor.selection.anchor, start) ||
              Point.equals(editor.selection.focus, start)
            )
          },
        },
        {
          trigger: "del",
          action: "stop",
          when: ({ editor, path }) => {
            if (!editor.selection) return false
            const start = Editor.end(editor, path)
            return (
              Point.equals(editor.selection.anchor, start) ||
              Point.equals(editor.selection.focus, start)
            )
          },
        },
      ],
    })
  }

  render(props: RenderElementProps<TableCellBlock<Id>>) {
    switch (this.id) {
      case "th":
        return vueJsxCompat(
          "th",
          {
            ...props.attributes,
            style: {
              padding: "8px",
              "border-width": "1px",
              "border-color": "var(--theme--border-color-accent)",
              "border-style": "solid",
              "background-color": "hsl(0 0% 60% / 0.15)",
              "font-weight": "bold",
            },
          },
          props.children as any
        )
      case "td":
        return vueJsxCompat(
          "td",
          {
            ...props.attributes,
            style: {
              padding: "8px",
              "border-width": "1px",
              "border-color": "var(--theme--border-color-accent)",
              "border-style": "solid",
            },
          },
          props.children as any
        )
      default:
        throw new Error(`Unknown TableCellBlock id: ${this.id}`)
    }
  }
}
