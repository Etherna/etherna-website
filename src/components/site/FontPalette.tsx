import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import FontPreview from "./FontPreview"

const weightName = (name: string | number) => {
  switch (name.toString()) {
    case "100":
      return "thin"
    case "200":
      return "ultralight"
    case "300":
      return "light"
    case "400":
      return "regular"
    case "500":
      return "medium"
    case "600":
      return "semibold"
    case "700":
      return "bold"
    case "800":
      return "extrabold"
    case "900":
      return "black"
    default:
      return ""
  }
}

type FontPaletteProps = {
  name: string
  fontFamily: string
  fontWeight: string[]
  link?: string | null
  importUrl?: string | null
}

const FontPalette: React.FC<FontPaletteProps> = ({
  name,
  fontFamily,
  fontWeight,
  link,
  importUrl,
}) => {
  const { t } = useTranslation("brand")

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
    <div className="flex w-full flex-col overflow-hidden rounded border border-gray-300 p-3">
      <div className="relative -mx-3 -mt-3 bg-gray-200 px-5 pb-24">
        {importUrl && (
          <FontPreview fontFamily={fontFamily} fontWeight={fontWeight} importUrl={importUrl} />
        )}
        {!importUrl && (
          <span className="w-full text-center text-4xl font-semibold text-gray-400 absolute-center">
            ND
          </span>
        )}
      </div>
      {name && <h3 className="mt-3 mb-0 text-base font-semibold">{name}</h3>}
      <span className="mb-4 text-xs font-semibold text-gray-600">{fontFamilies}</span>

      {link && (
        <a
          className="mt-auto ml-auto text-sm font-semibold"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t`details`} ↗
        </a>
      )}
    </div>
  )
}

export default FontPalette
