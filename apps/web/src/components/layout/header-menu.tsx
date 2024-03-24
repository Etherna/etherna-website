import { cn } from "@/utils/classnames"

import type { AnchorHTMLAttributes } from "react"

interface HeaderMenuProps {
  children?: React.ReactNode
  className?: string
  position?: "left" | "right"
  landingMenu?: boolean
  correctMobile?: boolean
}

function HeaderMenu({
  children,
  className,
  position,
  landingMenu,
  correctMobile,
}: HeaderMenuProps) {
  return (
    <nav
      className={cn(
        "flex flex-nowrap items-center lg:ml-0 lg:px-4",
        {
          "hidden xl:flex": landingMenu,
          "lg:mr-auto": position === "left",
          "lg:ml-auto": position === "right",
          "-ml-3.5 lg:ml-0": correctMobile,
        },
        className
      )}
    >
      {children}
    </nav>
  )
}

interface HeaderMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
  className?: string
  href?: string
  isAnchor?: boolean
}

function HeaderMenuLink({ children, className, isAnchor, ...props }: HeaderMenuLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "items-center whitespace-nowrap px-3 py-2 text-sm font-semibold text-gray-700 transition duration-500 hover:text-gray-600",
        "[&_svg]:mr-1.5 [&_svg]:h-[1.2em]",
        {
          "relative px-4 py-2 text-gray-700 hover:text-gray-800": isAnchor,
        },
        className
      )}
    >
      {children}
    </a>
  )
}

export { HeaderMenu, HeaderMenuLink }
