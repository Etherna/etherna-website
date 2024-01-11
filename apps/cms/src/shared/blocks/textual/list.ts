import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Element } from "slate"
import { vueJsxCompat } from "../../utils/vue"
import { ListItemBlock } from "./list-item"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ListType = inferBlockType<ListBlock<"ol" | "ul">>
export type ListElement = inferBlockElement<ListBlock<"ol" | "ul">>

export class ListBlock<Id extends "ol" | "ul"> extends SlateBlock<Id, {}> {
  protected _assert = (node: unknown) => {
    return (
      Element.isElement(node) &&
      "type" in node &&
      ["ol", "ul"].includes(node.type as string)
    )
  }

  constructor(id: Id, level = 0) {
    super(id, {
      emptyBlock: {
        type: id,
        children: [new ListItemBlock("li", level).emptyBlock],
      },
      allowedChildren: [
        ListItemBlock.withId("li"),
        ListBlock.withId("ol"),
        ListBlock.withId("ul"),
      ],
    })
  }

  render(props: RenderElementProps<ListBlock<Id>>) {
    switch (this.id) {
      case "ol":
      case "ul":
        return vueJsxCompat(
          this.id,
          {
            ...props.attributes,
            style: { paddingLeft: 0, listStylePosition: "inside" },
          },
          props.children,
        )
      default:
        return vueJsxCompat("div", props.attributes, props.children)
    }
  }
}
