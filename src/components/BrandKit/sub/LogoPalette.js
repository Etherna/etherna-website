import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const LogoPalette = ({ name, variants }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "brand")

  const groupedVariants = useMemo(() => {
    let groupedVariants = []

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
        size: variant_name
      })
    })

    return groupedVariants
  }, [variants])

  return (
    <div>
      <h3 className="mb-2 mt-8">{name}</h3>
      <div className="palette-grid">
        {groupedVariants.map((group, i) => (
          <div className="logo-palette" key={i}>
            <div className="logo-palette-preview">
              <img src={group.previewImage} alt="" />
            </div>
            <h3 className="logo-palette-name">{trans(`logoStyle.${group.style}`)}</h3>
            <div className="logo-palette-links">
              {group.variants.map((variant, i) => (
                <div className="link">
                  <a href={variant.href} download>{variant.size}</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

LogoPalette.propTypes = {
  name: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired,
}

export default LogoPalette
