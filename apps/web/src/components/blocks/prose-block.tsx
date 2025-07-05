import { RichText } from "../common/rich-text"
import { TextColumns, TextColumnsDescription, TextColumnsMainColumn } from "../layout/text-columns"
import { BaseBlock } from "./base-block"

import type { BlockProps } from "./base-block"
import type { ProseBlock } from "@payload-types"

export function ProseBlock({ id, content, background, blockType }: BlockProps<ProseBlock>) {
  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns className="container" centered={false} inline={false}>
        <TextColumnsMainColumn>
          {content && (
            <TextColumnsDescription>
              <RichText nodes={content.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
      </TextColumns>
    </BaseBlock>
  )
}
