import React from "react"

import { hslValue } from "@/lib/colors"
import { cn } from "@/lib/utils"

import type { Locale } from "@/i18n/types"
import type { Media, TextBlock } from "@payload-types"

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
  const bgImageResult = background.backgroundImage as Media | undefined
  const stopColors = (() => {
    let stops = background.colorStops?.length
      ? background.colorStops
      : [
          {
            color: "hsl(var(--card))",
            stop: 0,
          },
          {
            color: "hsl(var(--card) / 0)",
            stop: 1,
          },
        ]
    if (background.inverted) {
      stops = stops.map(({ stop }, i, self) => {
        const oppositeIndex = self.length - 1 - i
        const color = self[oppositeIndex]?.color ?? "hsl(var(--card))"
        return {
          color,
          stop,
        }
      })
    }
    return stops
  })()
  const bgColorsStops = (() => {
    return stopColors.map((stop) => `${stop.color} ${Math.round(stop.stop * 100)}%`).join(", ")
  })()
  const backgroundImage = (() => {
    switch (background.type) {
      case "image":
        return bgImageResult && bgImageResult.bundled?.image
          ? `url(${bgImageResult.bundled.image.src})`
          : ""
      case "verticalGradient":
        return `linear-gradient(to bottom, ${bgColorsStops})`
      case "horizontalGradient":
        return `linear-gradient(to right, ${bgColorsStops})`
      default:
        return ""
    }
  })()
  const currentBgColor = (() => {
    switch (background.type) {
      case "color":
        return background.color
      case "verticalGradient":
      case "horizontalGradient":
        return background.color || stopColors[0]?.color
      case "none":
      case "image":
        return undefined
    }
  })()
  const blockStyles = {
    backgroundColor: background.type === "color" ? (background.color ?? "") : "",
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ["--current-background" as keyof React.CSSProperties]: currentBgColor
      ? (currentBgColor.match(/^hsl\((.+)\)$/)?.[1] ?? hslValue(currentBgColor, " "))
      : undefined,
    ...style,
  } satisfies React.CSSProperties
  const hasBackground = background.type !== "none"

  return (
    <section
      {...props}
      className={cn(
        "flex w-screen flex-col text-foreground",
        {
          dark: background.dark,
          "py-4 md:py-6 lg:py-8": hasBackground && spacing === "sm",
          "my-4 md:my-6 lg:my-8": !hasBackground && spacing === "sm",
          "py-8 md:py-12 lg:py-16": hasBackground && spacing === "default",
          "my-8 md:my-12 lg:my-16": !hasBackground && spacing === "default",
          "py-10 md:py-16 lg:py-24": hasBackground && spacing === "lg",
          "my-10 md:my-16 lg:my-24": !hasBackground && spacing === "lg",
        },
        className,
      )}
      style={blockStyles}
      data-block={blockType}
      data-block-id={blockId}
    >
      {children}
    </section>
  )
}
