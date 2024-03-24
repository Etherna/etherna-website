import React, { useCallback, useState } from "react"

import { cn } from "@/utils/classnames"

interface FooterColumnProps {
  title: string
  children: React.ReactNode
  className?: string
}

function FooterColumn({ title, children, className }: FooterColumnProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        setShowMenu(!showMenu)
      }
    },
    [showMenu]
  )

  return (
    <div className={cn("border-b border-gray-300 md:border-b-0", className)}>
      <h4
        className="cursor-default py-3 text-sm"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="switch"
        aria-checked={showMenu}
        onClick={() => setShowMenu(!showMenu)}
        onKeyDown={handleKeyDown}
      >
        {title}
      </h4>

      <ul
        className={cn("hidden flex-col space-y-2 pb-4 md:flex", {
          flex: showMenu,
        })}
      >
        {children}
      </ul>
    </div>
  )
}

interface FooterColumnLinkProps {
  children: React.ReactNode
  className?: string
  href: string
  target?: "_blank" | "_self" | "_parent" | "_top"
}

function FooterColumnLink({ children, className, href, target }: FooterColumnLinkProps) {
  return (
    <li className={cn(className)}>
      <a className="text-sm text-gray-600 hover:text-black" href={href} target={target}>
        {children}
      </a>
    </li>
  )
}

export { FooterColumn, FooterColumnLink }
