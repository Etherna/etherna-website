import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Editor, Element, Path, Range } from "slate"

import { vueJsxCompat } from "../utils/vue"
import { Leaf } from "./leaf"
import { ParagraphBlock } from "./paragraph"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type QuoteType = inferBlockType<QuoteBlock>
export type QuoteElement = inferBlockElement<QuoteBlock>

export class QuoteBlock extends SlateBlock<"blockquote", {}> {
  protected _assert = (node: unknown) => {
    return (
      Element.isElement(node) && "type" in node && node.type === "blockquote"
    )
  }

  constructor() {
    super("blockquote", {
      emptyBlock: {
        type: "blockquote",
        children: [
          {
            type: "p",
            children: [{ text: "" }],
          },
        ],
      },
      allowedChildren: [Leaf, ParagraphBlock.withId("p")],
      behaviours: [
        {
          trigger: "enter",
          action: "append",
          withBlock: new ParagraphBlock(),
          when: ({ editor, element, path }) => {
            const lastChildPath = [...path, element.children.length - 1]

            if (!editor.selection || !Range.isCollapsed(editor.selection))
              return false
            if (!Path.isAncestor(lastChildPath, editor.selection.focus.path))
              return false

            // last line is empty
            if (element.children.length < 2) return false
            const lastPaths = [lastChildPath]
            return lastPaths.every(p => Editor.string(editor, p) === "")
          },
        },
      ],
    })
  }

  render(props: RenderElementProps<QuoteBlock>) {
    return vueJsxCompat(
      "blockquote",
      {
        ...props.attributes,
        style: {
          "border-left": "4px solid hsl(0 0% 50% / 0.5)",
          padding: "8px",
          "margin-left": "0",
          "margin-right": "0",
        },
      },
      props.children as any
    )
  }
}
