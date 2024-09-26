import { BaseBlock } from "./base-block"

import type { RelatedPostsBlock } from "@payload-types"

export function RelatedPostsBlock(props: RelatedPostsBlock) {
  return (
    <BaseBlock blockId={props.id} blockType={props.blockType} background={props.background}>
      <div className="container"></div>
    </BaseBlock>
  )
}
