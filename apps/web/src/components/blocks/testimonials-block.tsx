import { BaseBlock } from "./base-block"

import type { BlockProps } from "./base-block"
import type { TestimonialsBlock } from "@payload-types"

export function TestimonialsBlock(props: BlockProps<TestimonialsBlock>) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
