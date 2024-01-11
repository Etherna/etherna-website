import { Element } from "slate"
import { HeadingBlock, ParagraphBlock } from "../../../shared/blocks/textual"
import { vueJsxCompat } from "../../../shared/utils/vue"
import { ListOfBlock } from "../list-of"
import { SectionBlock } from "../section"
import { UiBlock } from "../ui-block"
import { FeatureBlock } from "./feature"
import Features from "./features.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type FeaturesType = inferBlockType<FeaturesBlock>
export type FeaturesElement = inferBlockElement<FeaturesBlock>

export class FeaturesBlock extends UiBlock<
  "features",
  {
    variant?: "default"
    backgroundStart?: string
    backgroundEnd?: string
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "features"
  }

  constructor() {
    const Title = new SectionBlock("title", new HeadingBlock("h3"), [
      {
        type: "h3",
        locked: true,
        placeholder: "Features title",
        children: [{ text: "" }],
      },
    ])
    const Paragraph = new SectionBlock("text", new ParagraphBlock(), [
      {
        type: "p",
        locked: true,
        placeholder: "Features description",
        children: [{ text: "" }],
      },
    ])
    const Features = new SectionBlock(
      "features",
      new ListOfBlock(new FeatureBlock()),
    )

    super("features", {
      emptyBlock: {
        type: "features",
        children: [Title.emptyBlock, Paragraph.emptyBlock, Features.emptyBlock],
      },
      layout: [
        {
          block: Title,
        },
        {
          block: Paragraph,
        },
        {
          block: Features,
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<FeaturesBlock>): any {
    return vueJsxCompat(Features as any, props, children)
  }
}
