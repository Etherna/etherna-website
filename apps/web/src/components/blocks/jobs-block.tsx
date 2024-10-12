import { BaseBlock } from "./base-block"

import type { BlockProps } from "./base-block"
import type { JobsBlock } from "@payload-types"

export function JobsBlock(props: BlockProps<JobsBlock>) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
