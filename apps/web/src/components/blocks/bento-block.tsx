import { BaseBlock } from "./base-block"

import type { BentoBlock } from "@payload-types"

export function BentoBlock(props: BentoBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
