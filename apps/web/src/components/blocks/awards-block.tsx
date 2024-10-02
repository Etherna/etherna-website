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
import { cn } from "@/lib/utils"

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
  const InnerTag = ("h" + (Number((heading ?? "h2").replace("h", "")) + 1)) as
    | "h3"
    | "h4"
    | "h5"
    | "h6"

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns className="container" centered={centered ?? false}>
        <TextColumnsMainColumn>
          {subtitle && <TextColumnsSubtitle>{subtitle}</TextColumnsSubtitle>}

          {title && (
            <TextColumnsTitle tag={heading} size={"lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {text && (
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
          className="group-hover/award:stop-color-gold/30 stop-color-foreground/30 transition-all duration-500"
          offset="0%"
        />
        <stop
          className="group-hover/award:stop-color-gold stop-color-foreground transition-all duration-500"
          offset="100%"
        />
      </linearGradient>
    </>
  )
}
