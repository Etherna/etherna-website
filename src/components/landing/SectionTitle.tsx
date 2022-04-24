import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import classes from "@styles/components/landing/SectionTitle.module.scss"

type SectionTitleProps = {
  title: string
  className?: string
  anchorLink?: string
  elRef?: React.LegacyRef<HTMLHeadingElement>
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  className,
  title,
  anchorLink,
  elRef,
}) => {
  return (
    <h2 className={classNames(classes.sectionTitle, className)} ref={elRef}>
      {anchorLink ? (
        <Link
          className="text-gray-800 hover:text-gray-800 hover:opacity-80"
          to={anchorLink.replace(/^#?/, "#")}
        >
          {title}
        </Link>
      ) : (
        title
      )}
    </h2>
  )
}

export default SectionTitle
