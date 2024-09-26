import React from "react"

import type { TextBlock } from "@payload-types"
import type { GetImageResult } from "astro"

interface BaseBlockProps extends React.ComponentPropsWithoutRef<"section"> {
  background: TextBlock["background"]
  blockType: string
  blockId?: TextBlock["id"]
}

export function BaseBlock({
  children,
  background,
  blockType,
  blockId,
  style,
  ...props
}: BaseBlockProps) {
  const bgImageResult = background.backgroundImage as unknown as GetImageResult | undefined
  const bgColorsStops = background.colorStops ?? []
  const backgroundImage = (() => {
    switch (background.type) {
      case "image":
        return bgImageResult ? `url(${bgImageResult.src})` : ""
      case "verticalGradient":
        return `linear-gradient(to bottom, ${bgColorsStops.map((stop) => stop.color).join(", ")})`
      case "horizontalGradient":
        return `linear-gradient(to right, ${bgColorsStops.map((stop) => stop.color).join(", ")})`
      default:
        return ""
    }
  })()
  const blockStyles = {
    backgroundColor: background.type === "color" ? (background.color ?? "") : "",
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...style,
  } satisfies React.CSSProperties

  return (
    <section {...props} style={blockStyles} data-block={blockType} data-block-id={blockId}>
      {children}
    </section>
  )
}
