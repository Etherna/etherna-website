import { useId } from "react"

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
import { cn } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { ClientsBlock, Media } from "@payload-types"

export function ClientsBlock({
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
  clients,
}: BlockProps<ClientsBlock>) {
  const elementId = useId()

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="gap-4 md:gap-6 lg:gap-6 xl:gap-6"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "sm"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "xs"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription className="text-sm">
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn inlineSize={"lg"}>
          <ul className="flex w-full flex-wrap items-center justify-around gap-x-3 gap-y-6">
            {clients.map((client, index) => {
              const gradientId = `${elementId}_ClientsGradient_${index}`
              return (
                <li
                  key={index}
                  className={cn("flex h-8 lg:h-10", {
                    "group/client": !!client.link?.url,
                  })}
                >
                  <a
                    href={client.link?.url || undefined}
                    className="flex h-full w-full items-center"
                  >
                    <Svg
                      className="mx-auto h-full max-w-[70%]"
                      svg={(client.logo as Media).bundled?.image?.svgContent}
                      defs={<SvgDefs id={gradientId} />}
                      style={{
                        fill: `url(#${gradientId})`,
                      }}
                    />
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
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
        <stop
          className="transition-all duration-500 stop-color-foreground/20 group-hover/client:stop-color-foreground"
          offset="0%"
        />
        <stop
          className="transition-all duration-500 stop-color-foreground/60 group-hover/client:stop-color-foreground"
          offset="100%"
        />
      </linearGradient>
    </>
  )
}
