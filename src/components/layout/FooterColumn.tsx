import classNames from "@utils/classnames"
import { Link } from "gatsby"
import React, { useState } from "react"

type FooterColumnProps = {
  title: string
  children: React.ReactNode
  className?: string
}

type FooterColumnLinkProps = {
  children: React.ReactNode
  className?: string
  href: string
  target?: "_blank" | "_self" | "_parent" | "_top"
}

const FooterColumnLink: React.FC<FooterColumnLinkProps> = ({
  children,
  className,
  href,
  target = "_blank",
}) => {
  return (
    <li className={classNames(className)}>
      <Link className="text-sm text-gray-600 hover:text-black" to={href} target={target}>{children}</Link>
    </li>
  )
}

const FooterColumn: React.FC<FooterColumnProps> & {
  Link: typeof FooterColumnLink
} = ({ title, children, className }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={classNames("border-b border-gray-300 md:border-b-0", className)}>
      <h4 className="cursor-default text-sm py-3" onClick={() => setShowMenu(!showMenu)}>{title}</h4>

      <ul
        className={classNames("pb-4 space-y-2 hidden flex-col md:flex", {
          "flex": showMenu,
        })}
      >
        {children}
      </ul>
    </div>
  )
}
FooterColumn.Link = FooterColumnLink

export default FooterColumn
