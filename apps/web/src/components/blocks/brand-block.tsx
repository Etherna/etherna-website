import { BaseBlock } from "./base-block"

import type { BrandBlock } from "@payload-types"

export function BrandBlock(props: BrandBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
