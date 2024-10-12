import { BaseBlock } from "./base-block"

import type { BlockProps } from "./base-block"
import type { TeamBlock } from "@payload-types"

export function TeamBlock(props: BlockProps<TeamBlock>) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
