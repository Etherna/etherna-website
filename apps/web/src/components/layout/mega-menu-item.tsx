import { Image } from "@/components/common/image"
import { cn } from "@/utils/classnames"

import type { AstroImageAsset } from "@/utils/data-parser"

interface MegaMenuItemProps {
  href?: string
  title: string
  excerpt?: string
  image?: AstroImageAsset | null
  isExternal?: boolean
  disabled?: boolean
}

export function MegaMenuItem({
  href,
  title,
  excerpt,
  image,
  isExternal,
  disabled,
}: MegaMenuItemProps) {
  return (
    <div
      className={cn(
        "mb-3 flex min-h-[5.5rem] w-full max-w-96 items-center rounded-lg px-3 py-2 md:flex-1",
        "transition-colors duration-500",
        {
          "hover:bg-gray-100": !disabled,
          "opacity-50": disabled,
        }
      )}
    >
      {image && (
        <div className="w-1/3 pr-4">
          <LinkWrapper href={href} external={isExternal}>
            <Image data={image} alt={title} />
          </LinkWrapper>
        </div>
      )}
      <div className="flex-1 text-sm font-semibold">
        <LinkWrapper href={href} external={isExternal}>
          <div className="text-gray-900">{title}</div>
          {excerpt && <p className="text-xs font-normal text-gray-500">{excerpt}</p>}
        </LinkWrapper>
      </div>
    </div>
  )
}

function LinkWrapper({
  children,
  href,
  external,
}: {
  children?: React.ReactNode
  href?: string
  external?: boolean
}) {
  return href ? (
    <a href={href} target={external ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  )
}
