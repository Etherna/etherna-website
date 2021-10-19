import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import classes from "@styles/components/layout/MegaMenuItem.module.scss"

type MegaMenuItemProps = {
  to?: string
  title: string
  excerpt?: string
  imageUrl?: string
  disabled?: boolean
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  to,
  title,
  excerpt,
  imageUrl,
  disabled
}) => {
  return (
    <div
      className={classNames(classes.megaMenuItem, {
        [classes.disabled]: disabled
      })}
    >
      <div className={classes.megaMenuItemImage}>
        <LinkWrapper to={to}>
          {imageUrl && (
            <img src={imageUrl} alt={title} />
          )}
        </LinkWrapper>
      </div>
      <div className={classes.megaMenuItemInfo}>
        <LinkWrapper to={to}>
          <div className={classes.megaMenuItemTitle}>{title}</div>
          {excerpt && (
            <p className={classes.megaMenuItemDescription}>{excerpt}</p>
          )}
        </LinkWrapper>
      </div>
    </div>
  )
}

const LinkWrapper: React.FC<{ to?: string }> = ({ children, to }) => to ? (
  <Link to={to}>{children}</Link>
) : (
  <>{children}</>
)

export default MegaMenuItem
