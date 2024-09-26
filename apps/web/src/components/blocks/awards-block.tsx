import { BaseBlock } from "./base-block"

import type { AwardsBlock } from "@payload-types"

export function AwardsBlock(props: AwardsBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
