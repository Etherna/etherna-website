import { BaseBlock } from "./base-block"

import type { BlockProps } from "./base-block"
import type { StatsBlock } from "@payload-types"

export function StatsBlock(props: BlockProps<StatsBlock>) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
