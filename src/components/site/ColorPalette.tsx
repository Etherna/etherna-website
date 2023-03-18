import React, { useMemo } from "react"
import convert from "color-convert"

type ColorPaletteProps = {
  name?: string
  color: string
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ name, color }) => {
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
      <div className="-mx-3 -mt-3 pb-24" style={{ backgroundColor: color }}></div>
      {name && <h3 className="mt-3 mb-2 text-base font-semibold">{name}</h3>}
      <table className="text-left">
        <tbody>
          {Object.entries(colors).map(([colorType, color]) => (
            <tr key={colorType}>
              <th className="pr-3 text-sm font-semibold uppercase text-gray-600">{colorType}</th>
              <td className="text-sm">{color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ColorPalette
