import { BaseBlock } from "./base-block"

import type { TeamBlock } from "@payload-types"

export function TeamBlock(props: TeamBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
