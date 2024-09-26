import { BaseBlock } from "./base-block"

import type { TextBlock } from "@payload-types"

export function TextBlock(props: TextBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
