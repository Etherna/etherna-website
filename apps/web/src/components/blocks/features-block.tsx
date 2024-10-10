import { RichText } from "../common/rich-text"
import { Svg } from "../common/svg"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { BaseBlock } from "./base-block"
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn, getInnerTag } from "@/lib/utils"

import type { FeaturesBlock } from "@payload-types"

export function FeaturesBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  forceFullWidth,
  titleSize,
  features,
}: FeaturesBlock) {
  const isInline = !forceFullWidth && !centered
  const InnerTag = getInnerTag(heading)

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false} inline={isInline}>
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn
          className={cn({
            "max-w-md": isInline,
          })}
          inlineSize={"lg"}
        >
          <ul
            className={cn("grid grid-cols-2 gap-x-8 gap-y-6", {
              "gap-y-12 sm:grid-cols-3 md:grid-cols-3 lg:gap-x-12": !isInline,
            })}
          >
            {features.map((feature, index) => (
              <li key={index} className="items- flex w-full flex-col gap-2 text-left">
                <div className="relative size-20 overflow-hidden rounded-lg bg-gradient-to-t from-foreground/20 to-foreground/10 p-0.5">
                  <div className="h-full w-full rounded-md bg-gradient-to-b from-muted to-card p-0.5">
                    {hasBundledImage(feature.icon) && feature.icon.bundled.image.svgContent && (
                      <Svg className="h-full w-full" svg={feature.icon.bundled.image.svgContent} />
                    )}
                  </div>
                </div>
                <InnerTag className="text-base/tight font-semibold text-secondary-foreground text-gradient md:text-lg/tight">
                  {feature.title}
                </InnerTag>
                <div className="text-sm/tight text-muted-foreground md:text-base/tight">
                  <RichText nodes={feature.description?.root.children ?? []} />
                </div>
              </li>
            ))}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
