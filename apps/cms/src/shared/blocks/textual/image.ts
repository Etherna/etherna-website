import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Element, Path } from "slate"
import { shallowRef } from "vue"
import { vueJsxCompat } from "../../utils/vue"
import ImageComponent from "./image.vue"
import { Leaf } from "./leaf"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type ImageType = inferBlockType<ImageBlock>
export type ImageElement = inferBlockElement<ImageBlock>

export const imageSelectionPath = shallowRef<Path | undefined>(undefined)

export class ImageBlock extends SlateBlock<
  "img",
  { src?: string; caption?: string }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "img"
  }

  constructor() {
    super("img", {
      emptyBlock: {
        type: "img",
        children: [{ text: "" }],
      },
      allowedChildren: [Leaf],
      isVoid: true,
    })
  }

  render({ children, ...props }: RenderElementProps<ImageBlock>): any {
    return vueJsxCompat(ImageComponent as any, props, children)
  }

  public static hasIdSource(element: ImageElement) {
    if (!element.src) return false
    return /^[a-z0-9-]+$/.test(element.src)
  }
}
