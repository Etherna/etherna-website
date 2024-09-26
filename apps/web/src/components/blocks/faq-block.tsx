import { BaseBlock } from "./base-block"

import type { FAQBlock } from "@payload-types"

export function FAQBlock(props: FAQBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
