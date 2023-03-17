import classes from "@/styles/components/layout/MegaMenuItem.module.scss"

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
      className={classNames(classes.megaMenuItem, {
        [classes.disabled]: disabled,
      })}
    >
      {image && (
        <div className={classes.megaMenuItemImage}>
          <LinkWrapper href={href} external={isExternal}>
            <Image data={image} alt={title} />
          </LinkWrapper>
        </div>
      )}
      <div className={classes.megaMenuItemInfo}>
        <LinkWrapper href={href} external={isExternal}>
          <div className={classes.megaMenuItemTitle}>{title}</div>
          {excerpt && <p className={classes.megaMenuItemDescription}>{excerpt}</p>}
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
