/* eslint-disable import/no-named-as-default-member */

import { useMemo } from "react"
import convert from "color-convert"

interface ColorPaletteProps {
  name?: string
  color: string
}

export function ColorPalette({ name, color }: ColorPaletteProps) {
  const colors = useMemo(() => {
    const hex = color.replace(/^#?/, "#")
    const rgb = convert.hex.rgb(hex).join(", ")
    const cmyk = convert.hex.cmyk(hex).join(", ")
    const hsl = convert.hex.hsl(hex).join(", ")
    const hsb = convert.hex.hsv(hex).join(", ")

    return {
      hex,
      rgb,
      cmyk,
      hsl,
      hsb,
    }
  }, [color])

  return (
    <div className="w-full overflow-hidden rounded border border-gray-300 p-3">
      <div className="-mx-3 -mt-3 pb-24" style={{ backgroundColor: color }} />
      {name && <h3 className="mb-2 mt-3 text-base font-semibold">{name}</h3>}
      <table className="text-left">
        <tbody>
          {Object.entries(colors).map(([colorType, colorVariant]) => (
            <tr key={colorType}>
              <th className="pr-3 text-sm font-semibold uppercase text-gray-600">{colorType}</th>
              <td className="text-sm">{colorVariant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
