import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Editor, Element, Point, Range, Text } from "slate"

import { vueJsxCompat } from "../utils/vue"
import { Leaf } from "./leaf"
import { ParagraphBlock } from "./paragraph"

import type { LeafElement } from "./leaf"
import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type HeadingType = inferBlockType<
  HeadingBlock<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">
>
export type HeadingElement = inferBlockElement<
  HeadingBlock<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">
>

export class HeadingBlock<
  Id extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
> extends SlateBlock<Id, { locked?: boolean; placeholder?: string }> {
  protected _assert = (node: unknown) => {
    return (
      Element.isElement(node) &&
      "type" in node &&
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.type as string)
    )
  }

  constructor(id: Id) {
    super(id, {
      emptyBlock: {
        type: id,
        children: [{ text: "" }],
      },
      allowedChildren: [Leaf],
      behaviours: [
        {
          trigger: "enter",
          action: "append",
          withBlock: new ParagraphBlock(),
          when(ctx) {
            const selection = ctx.editor.selection

            const text = Text.isText(ctx.element.children[0])
              ? ctx.element.children[0].text
              : ""

            return (
              selection !== null &&
              Range.isCollapsed(selection) &&
              selection.focus.offset === text.length
            )
          },
        },
        {
          trigger: "backspace",
          action: "stop",
          when: ({ editor, element, path }) => {
            if (!editor.selection) return false
            if (!element.locked) return false
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
          when: ({ editor, element, path }) => {
            if (!editor.selection) return false
            if (!element.locked) return false
            const start = Editor.end(editor, path)
            return (
              Point.equals(editor.selection.anchor, start) ||
              Point.equals(editor.selection.focus, start)
            )
          },
        },
        {
          trigger: "enter",
          action: "stop",
          when: ({ editor, element }) => {
            if (!editor.selection) return false
            if (!element.locked) return false
            return true
          },
        },
      ],
    })
  }

  render(props: RenderElementProps<HeadingBlock<Id>>): any {
    const fontSize = {
      h1: "32px",
      h2: "26px",
      h3: "20px",
      h4: "18px",
      h5: "16px",
      h6: "14px",
    }
    const style = {
      fontSize: fontSize[this.id],
      fontWeight: "bold",
      lineHeight: "1.2",
    }

    const textChild = props.element.children.find(el => Leaf.assert(el)) as
      | LeafElement
      | undefined
    const childText = textChild?.text ?? ""

    switch (this.id) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return vueJsxCompat(
          this.id,
          {
            ...props.attributes,
            style,
          },
          [
            props.children,
            childText === ""
              ? vueJsxCompat(
                  "span",
                  {
                    style: {
                      opacity: 0.5,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                    contentEditable: false,
                  },
                  props.element.placeholder
                )
              : null,
          ]
        )
      default:
        return vueJsxCompat(
          "div",
          {
            ...props.attributes,
            style,
          },
          [
            props.children,
            childText === ""
              ? vueJsxCompat(
                  "span",
                  {
                    style: {
                      opacity: 0.5,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                    contentEditable: false,
                  },
                  props.element.placeholder
                )
              : null,
          ]
        )
    }
  }
}
