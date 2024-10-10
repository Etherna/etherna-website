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
import { Button } from "../ui/button"
import { BaseBlock } from "./base-block"
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { CtaBlock } from "@payload-types"

export function CtaBlock({
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
  links,
  media,
}: CtaBlock) {
  const verticalButtons = !forceFullWidth && !centered

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="gap-6 md:gap-8 lg:gap-10"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "sm"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn className="lg:pt-2" inlineSize={"sm"}>
          <div
            className={cn("flex gap-3", {
              "mx-auto": centered,
              "flex-col": verticalButtons,
              "items-center": !verticalButtons,
            })}
          >
            {links?.map((link, i) => (
              <Button
                key={i}
                className={cn("min-w-32", {
                  "bg-transparent dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background":
                    link.link.appearance === "outline",
                })}
                variant={link.link.appearance === "outline" ? "outline" : "default"}
                size="default"
                asChild
              >
                <a href={link.link.url ?? ""} target={link.link.newTab ? "_blank" : undefined}>
                  {link.link.label}
                </a>
              </Button>
            ))}
          </div>
        </TextColumnsContentColumn>
      </TextColumns>

      {hasBundledImage(media) && (
        <div className="container mt-8 md:mt-12 lg:mt-16">
          <Image image={media.bundled.image} />
        </div>
      )}
    </BaseBlock>
  )
}
