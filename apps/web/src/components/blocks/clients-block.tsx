import { BaseBlock } from "./base-block"

import type { ClientsBlock } from "@payload-types"

export function ClientsBlock(props: ClientsBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
