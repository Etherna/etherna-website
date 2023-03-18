import Image from "@/components/common/Image"
import classNames from "@/utils/classnames"

import type { AstroImg } from "@/schema/app"

type MegaMenuItemProps = {
  href?: string
  title: string
  excerpt?: string
  image?: AstroImg | null
  isExternal?: boolean
  disabled?: boolean
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  href,
  title,
  excerpt,
  image,
  isExternal,
  disabled,
}) => {
  return (
    <div
      className={classNames(
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

const LinkWrapper: React.FC<{ children?: React.ReactNode; href?: string; external?: boolean }> = ({
  children,
  href,
  external,
}) => {
  return href ? (
    <a href={href} target={external ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  )
}

export default MegaMenuItem
