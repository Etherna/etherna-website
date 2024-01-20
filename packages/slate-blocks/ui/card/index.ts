import { Element } from "slate"

import { HeadingBlock, ParagraphBlock } from "../../textual"
import { vueJsxCompat } from "../../utils/vue"
import { ButtonBlock } from "../button"
import { ListOfBlock } from "../list-of"
import { SectionBlock } from "../section"
import { UiBlock } from "../ui-block"
import Card from "./card.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type CardType = inferBlockType<CardBlock>
export type CardElement = inferBlockElement<CardBlock>

export class CardBlock extends UiBlock<
  "card",
  {
    variant?: "default"
    backgroundStart?: string
    backgroundEnd?: string
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "card"
  }

  constructor() {
    const Title = new SectionBlock("title", new HeadingBlock("h3"), [
      {
        type: "h3",
        locked: true,
        placeholder: "Card title",
        children: [{ text: "" }],
      },
    ])
    const Paragraph = new SectionBlock("text", new ParagraphBlock(), [
      {
        type: "p",
        locked: true,
        placeholder: "Card description",
        children: [{ text: "" }],
      },
    ])
    const CTAs = new SectionBlock("cta", new ListOfBlock(new ButtonBlock()))

    super("card", {
      emptyBlock: {
        type: "card",
        children: [Title.emptyBlock, Paragraph.emptyBlock, CTAs.emptyBlock],
      },
      layout: [
        {
          block: Title,
        },
        {
          block: Paragraph,
        },
        {
          block: CTAs,
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<CardBlock>): any {
    return vueJsxCompat(Card as any, props, children as any)
  }
}
