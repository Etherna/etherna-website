import { Element } from "slate"

import { HeadingBlock, ImageBlock, ParagraphBlock } from "../../textual"
import { vueJsxCompat } from "../../utils/vue"
import { ButtonBlock } from "../button"
import { ListOfBlock } from "../list-of"
import { SectionBlock } from "../section"
import { UiBlock } from "../ui-block"
import Hero from "./hero.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type HeroType = inferBlockType<HeroBlock>
export type HeroElement = inferBlockElement<HeroBlock>

export class HeroBlock extends UiBlock<
  "hero",
  { variant?: "default" | "image-right" }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "hero"
  }

  constructor() {
    const Heading = new SectionBlock("heading", new HeadingBlock("h1"), [
      {
        type: "h1",
        locked: true,
        placeholder: "Hero title",
        children: [{ text: "" }],
      },
    ])
    const Paragraph = new SectionBlock("text", new ParagraphBlock(), [
      {
        type: "p",
        locked: true,
        placeholder: "Hero description",
        children: [{ text: "" }],
      },
    ])
    const CTAs = new SectionBlock("cta", new ListOfBlock(new ButtonBlock()))
    const Image = new SectionBlock("img", new ImageBlock())

    super("hero", {
      emptyBlock: {
        type: "hero",
        children: [
          Heading.emptyBlock,
          Paragraph.emptyBlock,
          CTAs.emptyBlock,
          Image.emptyBlock,
        ],
      },
      layout: [
        {
          block: Heading,
        },
        {
          block: Paragraph,
        },
        {
          block: CTAs,
        },
        {
          block: Image,
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<HeroBlock>): any {
    return vueJsxCompat(Hero as any, props, children as any)
  }
}
