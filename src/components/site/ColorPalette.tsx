import React, { useMemo } from "react"
import convert from "color-convert"

import classes from "@styles/components/site/ColorPalette.module.scss"

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
    <div className={classes.colorPalette}>
      <div className={classes.colorPalettePreview} style={{ backgroundColor: color }}></div>
      {name && (
        <h3 className={classes.colorPaletteName}>{name}</h3>
      )}
      <table className={classes.colorPaletteValues}>
        <tbody>
          {Object.entries(colors).map(([colorType, color]) => (
            <tr key={colorType}>
              <th>{colorType}</th>
              <td>{color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ColorPalette
