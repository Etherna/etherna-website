import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import Col from "@/components/common/Col"
import Image from "@/components/common/Image"

import type { AstroImg, LogoVariant } from "@/definitions/app"

type LogoPaletteProps = {
  name: string
  variants: LogoVariant[]
  gridClassName?: string
}

type VariantGroup = {
  previewImage?: AstroImg
  style: LogoVariant["style"]
  variants: Array<{
    href: string
    size: string
  }>
}

const LogoPalette: React.FC<LogoPaletteProps> = ({ name, variants, gridClassName }) => {
  const { t } = useTranslation("brand")

  const groupedVariants = useMemo(() => {
    const groupedVariants: VariantGroup[] = []

    variants.forEach(variant => {
      const { style, image, variant_name } = variant

      let groupIndex = groupedVariants.findIndex(v => v.style === style)
      if (groupIndex === -1) {
        groupedVariants.push({
          style,
          previewImage: image,
          variants: [],
        })
        groupIndex = groupedVariants.length - 1
      }

      groupedVariants[groupIndex]!.variants.push({
        href: image.attributes.src!,
        size: variant_name ?? "",
      })
    })

    return groupedVariants
  }, [variants])

  return (
    <div>
      <h3 className="mb-2 mt-8">{name}</h3>
      <div className={gridClassName}>
        {groupedVariants.map((group, i) => (
          <div
            className="flex w-full flex-col overflow-hidden rounded border border-gray-300 p-3"
            key={i}
          >
            <div className="-mx-3 -mt-3 flex items-center bg-gray-200 px-4 py-8">
              {group.previewImage && (
                <Image
                  data={{
                    attributes: group.previewImage.attributes,
                    blurhash: "",
                  }}
                  className="mx-auto h-10 w-auto max-w-full"
                  objectFit="contain"
                />
              )}
            </div>
            <h3 className="mt-3 mb-2 text-base font-semibold">{t(`logoStyle.${group.style}`)}</h3>
            <div className="flex flex-wrap">
              {group.variants.map((variant, i) => (
                <div key={i}>
                  <a href={variant.href} className="text-sm font-semibold" download>
                    {variant.size}
                  </a>
                  {i < group.variants.length - 1 && (
                    <span className="pointer-events-none mx-2 text-sm text-gray-500">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoPalette
