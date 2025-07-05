import { hslValue } from "./colors"

import type { Media, TextBlock } from "@payload-types"

export function generateBackground(background: TextBlock["background"]) {
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
        return bgImageResult &&
          bgImageResult.bundled?.image &&
          !bgImageResult.bundled.image.svgContent
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
  } satisfies React.CSSProperties
  const hasBackground = background.type !== "none"

  return {
    bgImageResult,
    stopColors,
    bgColorsStops,
    backgroundImage,
    currentBgColor,
    blockStyles,
    hasBackground,
  }
}
