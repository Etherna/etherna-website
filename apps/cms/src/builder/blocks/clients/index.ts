import { Element } from "slate"
import { HeadingBlock } from "../../../shared/blocks/textual"
import { vueJsxCompat } from "../../../shared/utils/vue"
import { ListOfBlock } from "../list-of"
import { SectionBlock } from "../section"
import { UiBlock } from "../ui-block"
import { ClientBlock } from "./client"
import Clients from "./clients.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ClientsType = inferBlockType<ClientsBlock>
export type ClientsElement = inferBlockElement<ClientsBlock>

export class ClientsBlock extends UiBlock<"clients", { variant?: "default" }> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "clients"
  }

  constructor() {
    const Heading = new SectionBlock("heading", new HeadingBlock("h2"), [
      {
        type: "h2",
        locked: true,
        placeholder: "Clients title",
        children: [{ text: "" }],
      },
    ])

    const Clients = new SectionBlock(
      "clients",
      new ListOfBlock(new ClientBlock()),
    )

    super("clients", {
      emptyBlock: {
        type: "clients",
        children: [Heading.emptyBlock, Clients.emptyBlock],
      },
      layout: [
        {
          block: Heading,
        },
        {
          block: Clients,
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<ClientsBlock>): any {
    return vueJsxCompat(Clients as any, props, children)
  }
}
