import React from "react"

import classes from "@styles/components/site/BrandKit.module.scss"

import ColorPalette from "./ColorPalette"
import FontPalette from "./FontPalette"
import LogoPalette from "./LogoPalette"
import useLocale from "@context/locale-context/hooks/useLocale"
import { ColorNode, FontNode, LogoNode } from "@definitions/sources"
import { useTranslations } from "@hooks/useTranslations"

type BrandKitProps = {
  colors: ColorNode[]
  fonts: FontNode[]
  logos: LogoNode[]
}

const BrandKit: React.FC<BrandKitProps> = ({ colors, fonts, logos }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "brand")

  return (
    <div className={classes.brandKit}>
      <section className={classes.brandKitSection}>
        <h2>{t`colors`}</h2>
        <div className={classes.paletteGrid}>
          {colors.map((colorInfo, i) => (
            <div className="col xs:w-1/2 sm:max-w-48" key={i}>
              <ColorPalette
                name={colorInfo.name}
                color={colorInfo.color}
                key={i}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={classes.brandKitSection}>
        <h2>{t`fonts`}</h2>
        <div className={classes.paletteGrid}>
          {fonts.map((fontInfo, i) => (
            <div className="col sm:w-1/2 md:w-1/3 lg:w-1/4" key={i}>
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

      <section className={classes.brandKitSection}>
        <h2>{t`logos`}</h2>
        {logos.map((logoInfo, i) => (
          <LogoPalette
            name={logoInfo.name}
            variants={logoInfo.logo_variants}
            gridClassName={classes.paletteGrid}
            key={i}
          />
        ))}
      </section>
    </div>
  )
}

export default BrandKit
