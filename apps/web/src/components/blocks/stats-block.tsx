import { RichText } from "../common/rich-text"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { BaseBlock } from "./base-block"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { StatsBlock } from "@payload-types"

export function StatsBlock({
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
  stats,
}: BlockProps<StatsBlock>) {
  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false} inline={!forceFullWidth && !centered}>
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
        <TextColumnsContentColumn inlineSize={"lg"}>
          <ul
            className={cn("grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3", {
              "md:grid-cols-3": centered,
            })}
          >
            {stats?.map((stat, index) => (
              <li key={index} className="w-full space-y-2">
                <p
                  className={cn("text-5xl/tight font-bold text-gradient md:text-6xl/tight", {
                    "md:text-7xl/tight": centered,
                  })}
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(stat.value)}
                </p>
                <p className="text-lg/tight font-semibold md:text-xl/tight">{stat.label}</p>
              </li>
            ))}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
