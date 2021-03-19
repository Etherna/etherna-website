import React, { useMemo } from "react"
import PropTypes from "prop-types"
import convert from "color-convert"

const ColorPalette = ({ name, color }) => {
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
    <div className="color-palette">
      <div className="color-palette-preview" style={{ backgroundColor: color }}></div>
      {name && (
        <h3 className="color-palette-name">{name}</h3>
      )}
      <table className="color-palette-values">
        <tbody>
          {Object.keys(colors).map((colorType, i) => (
            <tr key={i}>
              <th>{colorType}</th>
              <td>{colors[colorType]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ColorPalette.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string.isRequired,
}

export default ColorPalette
