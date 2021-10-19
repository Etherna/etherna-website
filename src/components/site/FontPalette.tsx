import React, { useMemo } from "react"
import classNames from "classnames"

import classes from "@styles/components/site/FontPalette.module.scss"

import FontPreview from "./FontPreview"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const weightName = (name: string | number) => {
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

type FontPaletteProps = {
  name: string
  fontFamily: string
  fontWeight: string[]
  link?: string | null
  importUrl?: string | null
}

const FontPalette: React.FC<FontPaletteProps> = ({ name, fontFamily, fontWeight, link, importUrl }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "brand")

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
    <div className={classes.fontPalette}>
      <div className={classNames(classes.fontPalettePreview, { undefined: !importUrl })} style={{}}>
        {importUrl && (
          <FontPreview
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            importUrl={importUrl}
          />
        )}
      </div>
      {name && (
        <h3 className={classes.fontPaletteName}>{name}</h3>
      )}
      <span className={classes.fontPaletteFontName}>{fontFamilies}</span>

      {link && (
        <a className={classes.fontPaletteLink} href={link} target="_blank" rel="noopener noreferrer">
          {t`details`} ↗
        </a>
      )}
    </div>
  )
}

export default FontPalette
