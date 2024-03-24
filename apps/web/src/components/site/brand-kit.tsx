import { useTranslation } from "react-i18next"

import { ColorPalette } from "./color-palette"
import { FontPalette } from "./font-palette"
import { LogoPalette } from "./logo-palette"

import type { ParsedBrandKitData } from "@/queries/fetch-brand-kit-data"

interface BrandKitProps {
  colors: ParsedBrandKitData["brand"]["colors"]
  fonts: ParsedBrandKitData["brand"]["fonts"]
  logos: ParsedBrandKitData["brand"]["logos"]
}

export function BrandKit({ colors, fonts, logos }: BrandKitProps) {
  const { t } = useTranslation("brand")

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-xl text-gray-700">{t("colors")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {colors.map(colorInfo => (
            <ColorPalette key={colorInfo.name} name={colorInfo.name} color={colorInfo.color} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-gray-700">{t("fonts")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {fonts.map(fontInfo => (
            <FontPalette key={fontInfo.name} {...fontInfo} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-gray-700">{t("logos")}</h2>
        {logos.map(logoInfo => (
          <LogoPalette
            key={logoInfo.name}
            name={logoInfo.name}
            variants={logoInfo.variants}
            gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          />
        ))}
      </section>
    </div>
  )
}
