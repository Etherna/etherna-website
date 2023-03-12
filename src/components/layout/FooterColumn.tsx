import React, { useState } from "react"

import classNames from "@/utils/classnames"

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
      <a className="text-sm text-gray-600 hover:text-black" href={href} target={target}>
        {children}
      </a>
    </li>
  )
}

const FooterColumn: React.FC<FooterColumnProps> & {
  Link: typeof FooterColumnLink
} = ({ title, children, className }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={classNames("border-b border-gray-300 md:border-b-0", className)}>
      <h4 className="cursor-default py-3 text-sm" onClick={() => setShowMenu(!showMenu)}>
        {title}
      </h4>

      <ul
        className={classNames("hidden flex-col space-y-2 pb-4 md:flex", {
          flex: showMenu,
        })}
      >
        {children}
      </ul>
    </div>
  )
}
FooterColumn.Link = FooterColumnLink

export default FooterColumn
