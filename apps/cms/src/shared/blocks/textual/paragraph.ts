import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Editor, Element, Point } from "slate"
import { vueJsxCompat } from "../../utils/vue"
import { Leaf } from "./leaf"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ParagraphType = inferBlockType<ParagraphBlock>
export type ParagraphElement = inferBlockElement<ParagraphBlock>

export class ParagraphBlock extends SlateBlock<
  "p",
  { locked?: boolean; placeholder?: string }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "p"
  }

  constructor() {
    super("p", {
      emptyBlock: {
        type: "p",
        children: [{ text: "" }],
      },
      allowedChildren: [Leaf],
      behaviours: [
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
      ],
    })
  }

  render(props: RenderElementProps<ParagraphBlock>): any {
    const textChild: string =
      props.element.children.find((el) => Leaf.assert(el)).text ?? ""

    return vueJsxCompat("p", props.attributes, [
      props.children,
      textChild === ""
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
            props.element.placeholder,
          )
        : null,
    ])
  }
}
