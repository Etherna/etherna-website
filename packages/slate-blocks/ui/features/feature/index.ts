import { Element } from "slate"

import { HeadingBlock, ImageBlock, ParagraphBlock } from "../../../textual"
import { vueJsxCompat } from "../../../utils/vue"
import { UiBlock } from "../../ui-block"
import Feature from "./feature.vue"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type FeatureType = inferBlockType<FeatureBlock>
export type FeatureElement = inferBlockElement<FeatureBlock>

export class FeatureBlock extends UiBlock<
  "feature",
  {
    variant?: "default"
    backgroundStart?: string
    backgroundEnd?: string
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "feature"
  }

  constructor() {
    const Icon = new ImageBlock()
    const Title = new HeadingBlock("h3")
    const Description = new ParagraphBlock()

    super("feature", {
      emptyBlock: {
        type: "feature",
        children: [
          Icon.emptyBlock,
          {
            ...Title.emptyBlock,
            placeholder: "Feature title",
          },
          {
            ...Description.emptyBlock,
            placeholder: "Feature description",
          },
        ],
      },
      layout: [
        {
          block: Icon,
        },
        {
          block: Title,
          props: {
            placeholder: "Feature title",
          },
        },
        {
          block: Description,
          props: {
            placeholder: "Feature description",
          },
        },
      ],
    })
  }

  render({ children, ...props }: RenderElementProps<FeatureBlock>): any {
    return vueJsxCompat(Feature as any, props, children as any)
  }
}
