import { BaseBlock } from "./base-block"

import type { FormBlock } from "@payload-types"

export function FormBlock(props: FormBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
