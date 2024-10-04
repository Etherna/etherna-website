import { useId } from "react"

import { LaurelWreathIcon } from "../assets/icons"
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
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn, getInnerTag } from "@/lib/utils"

import type { AwardsBlock, Media } from "@payload-types"

export function AwardsBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  awards,
}: AwardsBlock) {
  const elementId = useId()
  const InnerTag = getInnerTag(heading)

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false}>
        <TextColumnsMainColumn>
          {subtitle && <TextColumnsSubtitle>{subtitle}</TextColumnsSubtitle>}

          {title && (
            <TextColumnsTitle tag={heading} size={"lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn className="max-w-lg">
          <ul
            className={cn("grid grid-cols-2 gap-x-8 gap-y-12", {
              "md:grid-cols-3": centered,
            })}
          >
            {awards.map((award, index) => {
              const gradientId = `${elementId}_AwardGradient_${index}`
              return (
                <li
                  key={index}
                  className={cn("w-full", {
                    "group/award": !!award.link?.url,
                  })}
                >
                  <a
                    href={award.link?.url || undefined}
                    className="flex w-full flex-col gap-2 text-center"
                  >
                    <InnerTag className="text-base font-semibold text-secondary-foreground text-gradient">
                      {award.issuer}
                    </InnerTag>
                    <div className="relative w-full">
                      <Svg
                        className="w-full"
                        svg={<LaurelWreathIcon />}
                        defs={<SvgDefs id={gradientId} />}
                        style={{
                          fill: `url(#${gradientId})`,
                        }}
                      />
                      <Svg
                        className="-mt-[4%] w-[30%] absolute-center"
                        svg={(award.logo as Media).bundled?.image?.svgContent}
                        defs={<SvgDefs id={gradientId} />}
                        style={{
                          fill: `url(#${gradientId})`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{award.name}</p>
                  </a>
                </li>
              )
            })}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}

function SvgDefs({ id }: { id: string }) {
  return (
    <>
      <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
        <stop
          className="transition-all duration-500 stop-color-foreground/30 group-hover/award:stop-color-gold/30"
          offset="0%"
        />
        <stop
          className="transition-all duration-500 stop-color-foreground group-hover/award:stop-color-gold"
          offset="100%"
        />
      </linearGradient>
    </>
  )
}
