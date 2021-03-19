import React from "react"
import PropTypes, { string } from "prop-types"

import "./brand-kit.scss"

import ColorPalette from "./sub/ColorPalette"
import FontPalette from "./sub/FontPalette"
import LogoPalette from "./sub/LogoPalette"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const BrandKit = ({ colors, fonts, logos }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "brand")

  return (
    <div className="brand-kit">
      <section className="brand-kit-section">
        <h2>{trans("colors")}</h2>
        <div className="palette-grid">
          {colors.map((colorInfo, i) => (
            <div className="col xs:w-1/2 sm:max-w-48">
              <ColorPalette
                name={colorInfo.name}
                color={colorInfo.color}
                key={i}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="brand-kit-section">
        <h2>{trans("fonts")}</h2>
        <div className="palette-grid">
          {fonts.map((fontInfo, i) => (
            <div className="col sm:w-1/2 md:w-1/3 lg:w-1/4">
              <FontPalette
                name={fontInfo.name}
                fontFamily={fontInfo.font_family}
                fontWeight={fontInfo.font_weight}
                link={fontInfo.font_link}
                importUrl={fontInfo.import_url}
                key={i}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="brand-kit-section">
        <h2>{trans("logos")}</h2>
        {logos.map((logoInfo, i) => (
          <LogoPalette
            name={logoInfo.name}
            variants={logoInfo.logo_variants}
            key={i}
          />
        ))}
      </section>
    </div>
  )
}

BrandKit.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string.isRequired,
  })),
  fonts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    font_family: PropTypes.string.isRequired,
    font_weight: PropTypes.array,
    font_link: PropTypes.string,
    import_url: PropTypes.string,
  })),
  logos: PropTypes.arrayOf(PropTypes.shape({
    name: string,
    logo_variants: PropTypes.arrayOf(PropTypes.shape({
      variant_name: PropTypes.string,
      style: PropTypes.string,
      image: PropTypes.object.isRequired,
    })),
  })),
}

export default BrandKit
