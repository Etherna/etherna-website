import { colord } from "colord"

function colorValue(color: string, fn: "rgb" | "hsl", join = ", ") {
  const val = colord(color)

  switch (fn) {
    case "rgb": {
      const rgb = val.toRgb()
      return [rgb.r, rgb.g, rgb.b].join(join)
    }
    case "hsl": {
      const hsl = val.toHsl()
      return [hsl.h, hsl.s, hsl.l].join(join)
    }
  }
}

export function hslValue(color: string, join = ", ") {
  return colorValue(color, "hsl", join)
}

export function rgbValue(color: string, join = ", ") {
  return colorValue(color, "rgb", join)
}
