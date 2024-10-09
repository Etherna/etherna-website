import { RichText } from "../common/rich-text"
import {
  TextColumns,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { BaseBlock } from "./base-block"

import type { TextBlock } from "@payload-types"

export function TextBlock({
  id,
  title,
  subtitle,
  text,
  background,
  blockType,
  heading,
  centered,
  forceFullWidth,
  titleSize,
}: TextBlock) {
  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="container"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {text && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
      </TextColumns>
    </BaseBlock>
  )
}
