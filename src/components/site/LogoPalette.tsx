import React, { useMemo } from "react"

import classes from "@styles/components/site/LogoPalette.module.scss"

import Col from "@components/common/Col"
import useLocale from "@context/locale-context/hooks/useLocale"
import { LogoVariantNode } from "@definitions/sources"
import { useTranslations } from "@hooks/useTranslations"

type LogoPaletteProps = {
  name: string
  variants: LogoVariantNode[]
  gridClassName?: string
}

type VariantGroup = {
  previewImage?: string
  style: LogoVariantNode["style"]
  variants: Array<{
    href: string
    size: string
  }>
}

const LogoPalette: React.FC<LogoPaletteProps> = ({ name, variants, gridClassName }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "brand")

  const groupedVariants = useMemo(() => {
    const groupedVariants: VariantGroup[] = []

    variants.forEach(variant => {
      const { style, image, variant_name } = variant
      const imageUrl = image.localFile.publicURL

      let groupIndex = groupedVariants.findIndex(v => v.style === style)
      if (groupIndex === -1) {
        groupedVariants.push({
          style,
          previewImage: imageUrl,
          variants: []
        })
        groupIndex = groupedVariants.length - 1
      }

      if (imageUrl.endsWith(".svg")) {
        groupedVariants[groupIndex].previewImage = imageUrl
      }

      groupedVariants[groupIndex].variants.push({
        href: imageUrl,
        size: variant_name ?? ""
      })
    })

    return groupedVariants
  }, [variants])

  return (
    <div>
      <h3 className="mb-2 mt-8">{name}</h3>
      <div className={gridClassName}>
        {groupedVariants.map((group, i) => (
          <Col className="sm:w-1/2 md:w-1/3 lg:w-1/4" key={i}>
            <div className={classes.logoPalette} key={i}>
              <div className={classes.logoPalettePreview}>
                <img src={group.previewImage} alt="" />
              </div>
              <h3 className={classes.logoPaletteName}>{t(`logoStyle.${group.style}`)}</h3>
              <div className={classes.logoPaletteLinks}>
                {group.variants.map((variant, i) => (
                  <div className={classes.logoPaletteLink} key={i}>
                    <a href={variant.href} download>{variant.size}</a>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </div>
    </div>
  )
}

export default LogoPalette
