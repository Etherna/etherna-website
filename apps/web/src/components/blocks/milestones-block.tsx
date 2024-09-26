import { BaseBlock } from "./base-block"

import type { MilestonesBlock } from "@payload-types"

export function MilestonesBlock(props: MilestonesBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
