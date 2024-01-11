import { Element } from "slate"
import { vueJsxCompat } from "../../../shared/utils/vue"
import { UiBlock } from "../ui-block"
import ListOf from "./list-of.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ListType = inferBlockType<ListOfBlock>
export type ListElement = inferBlockElement<ListOfBlock>

export class ListOfBlock extends UiBlock<"list-of", {}> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "list-of"
  }

  constructor(block: UiBlock<any, any>) {
    super("list-of", {
      emptyBlock: {
        type: "list-of",
        children: [block.emptyBlock],
      },
      layout: [
        {
          block: block,
          multiple: true,
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<ListOfBlock>): any {
    return vueJsxCompat(ListOf as any, props, children)
  }
}
