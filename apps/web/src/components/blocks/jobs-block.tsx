import { BaseBlock } from "./base-block"

import type { JobsBlock } from "@payload-types"

export function JobsBlock(props: JobsBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
