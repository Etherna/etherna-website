import { BaseBlock } from "./base-block"

import type { CtaBlock } from "@payload-types"

export function CtaBlock(props: CtaBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
