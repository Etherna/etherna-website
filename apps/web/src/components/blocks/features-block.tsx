import { BaseBlock } from "./base-block"

import type { FeaturesBlock } from "@payload-types"

export function FeaturesBlock(props: FeaturesBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
