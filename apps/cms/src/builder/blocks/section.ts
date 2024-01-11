import { Element } from "slate"
import { ParagraphBlock } from "../../shared/blocks/textual"
import { vueJsxCompat } from "../../shared/utils/vue"
import { UiBlock } from "./ui-block"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
  SlateDescendant,
  SlateElement,
} from "@mattiaz9/slate-jsx"

export type SectionType = inferBlockType<SectionBlock>
export type SectionElement = inferBlockElement<SectionBlock>

export class SectionBlock extends UiBlock<"section", { id: string }> {
  sectionId: string

  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "section"
  }

  constructor(
    sectionId?: string,
    block?: UiBlock<any, any>,
    children?: SlateDescendant[],
  ) {
    // only allow blocks of the same type
    if (children?.some((child) => child.type !== block?.id)) {
      throw new Error("SectionBlock can only contain the same type of elements")
    }

    super("section", {
      emptyBlock: {
        type: "section",
        id: sectionId ?? "-",
        children: children ?? [block?.emptyBlock],
      },
      layout: block
        ? [
            {
              block,
              multiple: true,
            },
          ]
        : [],
    })

    this.sectionId = sectionId ?? "-"
  }

  render({ children, ...props }: RenderElementProps<SectionBlock>): any {
    return vueJsxCompat(
      "section",
      {
        ...props.attributes,
        "data-section-id": props.element.id,
      },
      children,
    )
  }
}
