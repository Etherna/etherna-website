import { LockIcon } from "lucide-react"

import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import {
  TextColumns,
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
import type { GridBlock } from "@payload-types"

export function GridBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  size,
  titleSize,
  rows,
}: BlockProps<GridBlock>) {
  const InnerTag = getInnerTag(heading)

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns className="flex-col" centered={centered ?? false} inline={false}>
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "sm"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "sm"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription className="text-sm">
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
      </TextColumns>

      <div
        className={cn("mt-6 md:mt-10 lg:mt-16", {
          container: size === "default",
          "mx-auto w-full max-w-screen-2xl px-1": size === "large",
        })}
      >
        <ul className="flex flex-col">
          {rows?.map((row, index) => {
            const itemsCount = row.items?.length ?? 0

            return (
              <li key={index} className="w-full">
                <Hr className="hidden md:block" />

                <ul
                  key={index}
                  className={cn("grid auto-rows-[minmax(320px,max-content)]", {
                    "md:grid-cols-2": itemsCount === 2,
                    "md:grid-cols-3": itemsCount === 3,
                  })}
                >
                  {row.items?.map((item, index) => {
                    const hasLink = !!item.link?.url && item.effect !== "appear"
                    return (
                      <li
                        key={index}
                        className={cn("relative flex h-full w-full flex-col overflow-hidden", {
                          "border-l border-border/80": index > 0,
                          "group/item": item.effect && item.effect !== "none",
                          "focus:outline-none": item.effect === "appear",
                          "cursor-pointer": hasLink,
                        })}
                        tabIndex={item.effect === "appear" ? 0 : undefined}
                      >
                        <Hr className="md:hidden" />
                        <div
                          className={cn(
                            "flex w-full grow bg-gradient-to-r from-transparent via-transparent to-transparent group-hover/item:from-transparent group-hover/item:via-card group-hover/item:to-transparent",
                            {
                              "md:group-hover/item:from-transparent md:group-hover/item:via-card md:group-hover/item:to-card":
                                index === 0 && itemsCount > 1,
                              "md:group-hover/item:from-card md:group-hover/item:via-card md:group-hover/item:to-card":
                                index > 0 && index < itemsCount - 1 && itemsCount > 1,
                              "md:group-hover/item:from-card md:group-hover/item:via-card md:group-hover/item:to-transparent":
                                index === itemsCount - 1 && itemsCount > 1,
                            },
                          )}
                        >
                          <div
                            className={cn(
                              "relative flex h-full w-full flex-col p-6 lg:p-12 xl:p-20",
                              {
                                "mx-auto max-w-3xl": itemsCount === 1,
                              },
                            )}
                          >
                            <div
                              className={cn(
                                "flex max-w-lg flex-col items-start transition-all duration-300",
                                {
                                  "-translate-y-full opacity-0 delay-300 group-focus/item:translate-y-0 group-focus/item:opacity-100":
                                    item.effect === "appear",
                                },
                              )}
                            >
                              <InnerTag className="text-lg/tight font-semibold md:text-2xl/tight lg:text-3xl/tight">
                                {item.title}
                              </InnerTag>

                              {isNotEmptyLexical(item.description) && (
                                <div className="prose mt-3 text-sm text-secondary-foreground prose-p:my-1">
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
                            {item.background.type === "image" &&
                              hasBundledImage(item.background.backgroundImage) && (
                                <Image
                                  className={cn(
                                    "absolute -bottom-[5%] -right-[5%] top-[25%] h-[110%] w-auto select-none object-contain object-right duration-500 md:-top-[5%]",
                                    {
                                      "group-hover/item:scale-105": item.effect === "zoom",
                                      "group-hover/item:-translate-x-[5%]": item.effect === "slide",
                                      "translate-x-full scale-90 delay-300 group-focus/item:translate-x-0 group-focus/item:scale-100":
                                        item.effect === "appear",
                                    },
                                  )}
                                  image={item.background.backgroundImage.bundled.image}
                                />
                              )}

                            {item.effect === "appear" && (
                              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-300 absolute-center group-focus/item:scale-0">
                                <LockIcon className="size-4" />
                              </div>
                            )}
                          </div>
                        </div>

                        {item.link?.url && item.effect !== "appear" && (
                          <a href={item.link.url} className="absolute inset-0 focus:outline-none" />
                        )}

                        {index === itemsCount - 1 && <Hr className="md:hidden" />}
                      </li>
                    )
                  })}
                </ul>

                {index === rows.length - 1 && <Hr className="hidden md:block" />}
              </li>
            )
          })}
        </ul>
      </div>
    </BaseBlock>
  )
}

function Hr({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px bg-gradient-to-r from-border/10 via-border/80 to-border/10", className)}
    />
  )
}
