import { Editor, Element, Point } from "slate"
import { Leaf } from "../../../shared/blocks/textual"
import { LeafElement } from "../../../shared/blocks/textual/leaf"
import { vueJsxCompat } from "../../../shared/utils/vue"
import { UiBlock } from "../ui-block"
import Button from "./button.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ButtonType = inferBlockType<ButtonBlock>
export type ButtonElement = inferBlockElement<ButtonBlock>

export class ButtonBlock extends UiBlock<
  "button",
  {
    variant?: "default" | "ghost" | "outline" | "secondary"
    background?: string
    color?: string
    href?: LeafElement["href"]
    target?: LeafElement["target"]
    to?: LeafElement["to"]
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "button"
  }

  constructor() {
    super("button", {
      emptyBlock: {
        type: "button",
        children: [{ text: "Click me!" }],
      },
      allowedChildren: [Leaf],
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
        {
          trigger: "enter",
          action: "stop",
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<ButtonBlock>): any {
    return vueJsxCompat(Button as any, props, children)
  }
}
