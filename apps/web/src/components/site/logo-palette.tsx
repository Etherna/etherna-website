import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Image } from "@/components/common/image"

import type { AstroImg, LogoVariant } from "@/schema/app"

interface VariantGroup {
  previewImage?: AstroImg
  style: LogoVariant["style"]
  variants: {
    href: string
    size: string
  }[]
}

interface LogoPaletteProps {
  name: string
  variants: LogoVariant[]
  gridClassName?: string
}

export function LogoPalette({ name, variants, gridClassName }: LogoPaletteProps) {
  const { t } = useTranslation("brand")

  const groupedVariants = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const groupedVariants: VariantGroup[] = []

    variants.forEach(variant => {
      const { style, image, variant_name: variantName } = variant

      if (!image) return

      let groupIndex = groupedVariants.findIndex(v => v.style === style)
      if (groupIndex === -1) {
        groupedVariants.push({
          style,
          previewImage: image,
          variants: [],
        })
        groupIndex = groupedVariants.length - 1
      }

      groupedVariants[groupIndex]?.variants.push({
        href: image.attributes.src as string,
        size: variantName ?? "",
      })
    })

    return groupedVariants
  }, [variants])

  return (
    <div>
      <h3 className="mb-2 mt-8">{name}</h3>
      <div className={gridClassName}>
        {groupedVariants.map(group => (
          <div
            key={group.style}
            className="flex w-full flex-col overflow-hidden rounded border border-gray-300 p-3"
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
            <h3 className="mb-2 mt-3 text-base font-semibold">{t(`logoStyle.${group.style}`)}</h3>
            <div className="flex flex-wrap">
              {group.variants.map((variant, i) => (
                <div key={variant.href}>
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
