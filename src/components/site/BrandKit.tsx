import { useTranslation } from "react-i18next"

import ColorPalette from "./ColorPalette"
import FontPalette from "./FontPalette"
import LogoPalette from "./LogoPalette"

import type { Brand } from "@/definitions/app"

type BrandKitProps = {
  colors: Brand["colors"]
  fonts: Brand["fonts"]
  logos: Brand["logos"]
}

const BrandKit: React.FC<BrandKitProps> = ({ colors, fonts, logos }) => {
  const { t } = useTranslation("brand")

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-xl text-gray-700">{t("colors")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {colors.map((colorInfo, i) => (
            <ColorPalette name={colorInfo.name} color={colorInfo.color} key={i} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-gray-700">{t("fonts")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {fonts.map((fontInfo, i) => (
            <FontPalette
              name={fontInfo.name}
              fontFamily={fontInfo.font_family}
              fontWeight={fontInfo.font_weight}
              link={fontInfo.font_link}
              importUrl={fontInfo.import_url}
              key={i}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-gray-700">{t("logos")}</h2>
        {logos.map((logoInfo, i) => (
          <LogoPalette
            name={logoInfo.name}
            variants={logoInfo.logo_variants}
            gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            key={i}
          />
        ))}
      </section>
    </div>
  )
}

export default BrandKit
