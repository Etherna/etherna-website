import { Element } from "slate"

import { ImageBlock } from "../../../textual"
import { vueJsxCompat } from "../../../utils/vue"
import { UiBlock } from "../../ui-block"
import Client from "./client.vue"

import type { LeafElement } from "../../../textual/leaf"
import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ClientType = inferBlockType<ClientBlock>
export type ClientElement = inferBlockElement<ClientBlock>

export class ClientBlock extends UiBlock<
  "client",
  {
    variant?: "default"
    href?: LeafElement["href"]
    target?: LeafElement["target"]
    to?: LeafElement["to"]
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "client"
  }

  constructor() {
    super("client", {
      emptyBlock: {
        type: "client",
        children: [new ImageBlock().emptyBlock],
      },
      layout: [
        {
          block: new ImageBlock(),
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<ClientBlock>): any {
    return vueJsxCompat(Client as any, props, children as any)
  }
}
