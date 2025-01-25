import { Image } from "../common/image"
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
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn, getInnerTag } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { BentoBlock } from "@payload-types"

export function BentoBlock({
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
  items,
}: BlockProps<BentoBlock>) {
  const InnerTag = getInnerTag(heading)

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="flex-col"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "default"}>
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
          <ul className="grid auto-rows-[minmax(320px,max-content)] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-8">
            {items?.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-card to-transparent p-6",
                  {
                    "group/item": !!item.link?.url,
                    "sm:col-span-1 lg:col-span-2": item.colSpan === 2,
                    "sm:col-span-1 lg:col-span-3": item.colSpan === 3,
                    "sm:col-span-2 lg:col-span-4": item.colSpan === 4,
                    "sm:col-span-2 lg:col-span-5": item.colSpan === 5,
                    "sm:col-span-3 lg:col-span-6": item.colSpan === 6,
                    "row-span-2": item.rowSpan === 2,
                  },
                )}
              >
                <a
                  href={item.link?.url || undefined}
                  className="relative flex w-full grow flex-col gap-2"
                >
                  {item.background.type === "image" &&
                    hasBundledImage(item.background.backgroundImage) && (
                      <Image
                        className="absolute -inset-y-[5%] -right-[5%] -z-[1] h-[110%] w-auto select-none object-contain object-right duration-500"
                        image={item.background.backgroundImage.bundled.image}
                      />
                    )}

                  <div className="flex w-full flex-col items-center text-center">
                    <InnerTag className="text-lg/tight font-semibold">{item.title}</InnerTag>

                    {isNotEmptyLexical(item.description) && (
                      <div className="mt-3 text-sm text-secondary-foreground">
                        <RichText
                          nodes={item.description.root.children}
                          highlightStyles={{
                            background: "transparent",
                            color: item.accentColor ?? "",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
