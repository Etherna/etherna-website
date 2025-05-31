import React from "react"

import { Svg } from "../common/svg"
import { generateBackground } from "@/lib/background"
import { cn } from "@/lib/utils"

import type { Locale } from "@/i18n/types"
import type { TextBlock } from "@payload-types"

export interface BaseBlockProps extends React.ComponentProps<"section"> {
  background: TextBlock["background"]
  blockType: string
  blockId?: TextBlock["id"]
  spacing?: "none" | "sm" | "default" | "lg"
}

export type BlockProps<T> = Prettify<
  T & {
    locale: Locale
  }
>

export function BaseBlock({
  children,
  className,
  background,
  blockType,
  blockId,
  spacing = "default",
  style,
  ...props
}: BaseBlockProps) {
  const { bgImageResult, hasBackground, blockStyles } = generateBackground(background)

  return (
    <section
      {...props}
      className={cn(
        "relative flex w-screen flex-col text-foreground",
        {
          dark: background.dark,
          "py-4 md:py-6 lg:py-8": hasBackground && spacing === "sm",
          "my-4 md:my-6 lg:my-8": !hasBackground && spacing === "sm",
          "py-8 md:py-12 lg:py-16": hasBackground && spacing === "default",
          "my-8 md:my-12 lg:my-16": !hasBackground && spacing === "default",
          "py-10 md:py-16 lg:py-24 xl:py-32": hasBackground && spacing === "lg",
          "my-10 md:my-16 lg:my-24 xl:my-32": !hasBackground && spacing === "lg",
        },
        className,
      )}
      style={{
        ...blockStyles,
        ...style,
      }}
      data-block={blockType}
      data-block-id={blockId}
    >
      {background.type === "image" && bgImageResult?.bundled?.image?.svgContent && (
        <Svg
          svg={bgImageResult.bundled.image.svgContent}
          className="absolute inset-0 h-full w-full"
        />
      )}
      <div className="z-0">{children}</div>
    </section>
  )
}
