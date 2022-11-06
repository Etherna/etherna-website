import React from "react"
import { Link } from "gatsby"
import classNames from "@utils/classnames"

import classes from "@styles/components/layout/MegaMenuItem.module.scss"

type MegaMenuItemProps = {
  to?: string
  title: string
  excerpt?: string
  imageUrl?: string
  isExternal?: boolean
  disabled?: boolean
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  to,
  title,
  excerpt,
  imageUrl,
  isExternal,
  disabled
}) => {
  return (
    <div
      className={classNames(classes.megaMenuItem, {
        [classes.disabled]: disabled
      })}
    >
      {imageUrl && (
        <div className={classes.megaMenuItemImage}>
          <LinkWrapper to={to} external={isExternal}>
            <img src={imageUrl} alt={title} />
          </LinkWrapper>
        </div>
      )}
      <div className={classes.megaMenuItemInfo}>
        <LinkWrapper to={to} external={isExternal}>
          <div className={classes.megaMenuItemTitle}>{title}</div>
          {excerpt && (
            <p className={classes.megaMenuItemDescription}>{excerpt}</p>
          )}
        </LinkWrapper>
      </div>
    </div>
  )
}

const LinkWrapper: React.FC<{ children?: React.ReactNode, to?: string, external?: boolean }> = ({
  children,
  to,
  external,
}) => {
  return to ? (
    external ? (
      <a href={to} target="_blank" rel="noreferrer">{children}</a>
    ) : (
      <Link to={to}>{children}</Link>
    )
  ) : (
    <>{children}</>
  )
}

export default MegaMenuItem
