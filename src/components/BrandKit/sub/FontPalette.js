import React, { useMemo } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

import FontPreview from "./FontPreview"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const weightName = name => {
  switch (name.toString()) {
    case "100": return "thin"
    case "200": return "ultralight"
    case "300": return "light"
    case "400": return "regular"
    case "500": return "medium"
    case "600": return "semibold"
    case "700": return "bold"
    case "800": return "extrabold"
    case "900": return "black"
    default: return ""
  }
}

const FontPalette = ({ name, fontFamily, fontWeight, link, importUrl }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "brand")

  const fontFamilies = useMemo(() => {
    if (!fontWeight) return fontFamily

    let weigths = fontWeight

    if (!Array.isArray(weigths)) weigths = [weigths]

    weigths = weigths.map(weight => {
      // eslint-disable-next-line eqeqeq
      const weightSuffix = weight != "400" ? "-" + weightName(weight) : ""
      return `${fontFamily}${weightSuffix}`
    })

    return weigths.join(", ")
  }, [fontFamily, fontWeight])

  return (
    <div className="font-palette">
      <div className={classnames("font-palette-preview", { undefined: !importUrl })} style={{}}>
        {importUrl && (
          <FontPreview
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            importUrl={importUrl}
          />
        )}
      </div>
      {name && (
        <h3 className="font-palette-name">{name}</h3>
      )}
      <span className="font-palette-font-name">{fontFamilies}</span>

      {link && (
        <a className="font-palette-link" href={link} target="_blank" rel="noopener noreferrer">
          {trans("details")} ↗
        </a>
      )}
    </div>
  )
}

FontPalette.propTypes = {
  name: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
  fontWeight: PropTypes.string,
  link: PropTypes.string,
  importUrl: PropTypes.string,
}

export default FontPalette
